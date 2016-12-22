var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');

var Communities = require('../models/Communities.js');
var Users = require('../models/Users.js');
var Events = require('../models/Events.js');
var Memberships = require('../models/Memberships.js');
var Ideas = require('../models/Projects.js');
var Orgs = require('../models/Orgs.js');
var Activity = require('../models/Activities.js');
var Projects = require('../models/Projects.js');


/* GET all communities
   (Where all of the user's communities are listed)
   NOTE: currently passes ALL Community documents, this obviously needs
   to change at some point, but for now it works since there aren't too many.
   */
exports.allCommunities = function(req, res, next) {
	Communities.find({}, function(err, data){
	    if (err) {
            res.status(203);
	    } else {
	        res.status(200).json({"communities": data});
	    }
	})
}

/* GET community
   :id - the id of the community to display
   populates the orgs and ideas fields
   NOTE: the members fields technically refers to users as well, but
   is not populated. This is because mongoose has no .contains() method, and in
   order to check if the user is a supporter we simply keep supporters as user _ids
   and call .indexOf(me) on it.
   */
exports.getCommunity = function(req, res, next) {
    var community = [];
    var members = [];
    var projects = [];

	Communities.findById(req.params.id)
    .exec(function (err, commun) {
        if (err) {
            res.status(203);
        }
        else if (commun == null) {
            res.status(203);
            // should go back to dashboard
        }
        else {
            community = commun;


        }

        Memberships.find({ "community" : req.params.id })
            .populate('user')
            .exec(function (err, memberships) {

            if (err) {
               //
            }
            else {
                members = memberships;
            }

        Projects.find({ "community" : req.params.id })
            .populate('user')
            .exec(function (err, projects) {

            if (err) {
                //
            }
            else {
                projects = projects;
            }

            // send data
            res.status(200).json({"community": community, "members": members, "projects": projects});
            })
        })

    })
}


/*
 *
 * OLD BACK END FUNCTIONALITY
 *
 *
/*

/* GET Create Community page. */
router.get('/create', function(req, res, next) {
	res.render('create-community', { title: 'Create Community - ', user: req.user });
});

/* GET Create Idea page.
   :id - the id of the community to create an idea(project) for
   */
router.get('/:id/create-idea', function(req, res, next) {
	Communities.findById(req.params.id, function(err, data){
		res.render('create-idea', { title: 'Create Idea - ', user: req.user, data: data });
	})
});

/* GET Create Organization page.
   :id - the id of the community to create an Organization for
   */
router.get('/:id/create-org', function(req, res, next) {
	Communities.findById(req.params.id, function(err, data){
		res.render('create-org', { title: 'Create Organization - ', user: req.user, data: data });
	})
});

/* GET Comm (specific community) page.
   :id - the id of the community to display
   populates the orgs and ideas fields
   NOTE: the members fields technically refers to users as well, but
   is not populated. This is because mongoose has no .contains() method, and in
   order to check if the user is a supporter we simply keep supporters as user _ids
   and call .indexOf(me) on it.
   */
router.get('/:id', function(req, res, next) {
	Communities.findById(req.params.id)
	.populate('orgs ideas')
    .exec(function (err, commun) {
      if (commun == null) {
      	res.redirect('/dashboard');
      }
      else {
      	Memberships.find({ "community" : req.params.id })
      	.populate('user')
      	.exec(function (err, memberships) {
          console.log('MEMBERSHIPS: ' +err);
          Activity.find({ "community" : req.params.id })
          .populate('user community idea task org')
          .exec(function (err, activityData) {
            console.log('ACTIVITY: ' +err);
            Ideas.find({ "community" : req.params.id })
            .populate('user')
            .exec(function (err, ideaList) {
              console.log('PROJECTS: ' +err);
      	      res.render('comm', { title: commun.name + ' - ', data: commun, user: req.user, members: memberships, feed: activityData, projects: ideaList});
            });
          });
      	});
      }
    });
});

/* Handle  POST */
router.post('/:id/join', exports.update = function ( req, res ){
	// create new membership
	var newMembership = new Memberships({
      user: req.user.id,
      community: req.params.id
    })
    console.log("NEWMEMBERSHIP: " + newMembership)

    newMembership.save( function ( err, user, count ){
      if (err) return console.log(err);
    });

    // add community to users
	Users.findByIdAndUpdate(
		req.user.id,
		{ "$addToSet" : { "communities" : req.params.id } },
		{ upsert : true},
		function(err, model) {
        	console.log(err);
   		}
	);

	// add to activity feed
	var newActivity = new Activity({
      user: req.user.id,
      desttype: 'Communities',
      community: req.params.id,
      details: 'joined'
    })


    newActivity.save( function ( err, user, count ){
      if (err) return console.log(err);
      res.redirect('/community/' + req.params.id);
    });
});

/* Handle  POST */
router.post('/:id/leave', exports.update = function ( req, res ){
	Users.findByIdAndUpdate(
		req.user.id,
		{ "$pull" : { "communities" : req.params.id } },
		function(err, model) {
        	console.log(err);
   		}
	);

	Memberships.find( { "user" : req.user.id, "community" : req.params.id }).remove().exec();

	// add to activity feed
	var newActivity = new Activity({
      user: req.user.id,
      desttype: 'Communities',
      community: req.params.id,
      details: 'left'
    })


    newActivity.save( function ( err, user, count ){
      if (err) return console.log(err);
    });

	res.redirect('/community/' + req.params.id);
});