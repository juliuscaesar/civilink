var express = require('express');
var router = express.Router();

var Communities = require('../models/Communities.js');
var Users = require('../models/Users.js');
var Events = require('../models/Events.js');
var Ideas = require('../models/Ideas.js');
var Orgs = require('../models/Orgs.js');
var Activity = require('../models/Activity.js');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

/* GET community page. 
   (Where all of the user's communities are listed)
   NOTE: currently passes ALL Community documents, this obviously needs
   to change at some point, but for now it works since there aren't too many.
   */
router.get('/', isAuthenticated, function(req, res, next) {
	Communities.find({}, function(err, data){
		res.render('community', { title: 'Communities - ', user: req.user, data: data });
	})
});

/* GET Create Community page. */
router.get('/create', isAuthenticated, function(req, res, next) {
	res.render('create-community', { title: 'Create Community - ', user: req.user });
});

/* GET Create Idea page.
   :id - the id of the community to create an idea(project) for 
   */
router.get('/:id/create-idea', isAuthenticated, function(req, res, next) {
	Communities.findById(req.params.id, function(err, data){
		res.render('create-idea', { title: 'Create Idea - ', user: req.user, data: data });
	})
});

/* GET Create Organization page.
   :id - the id of the community to create an Organization for 
   */
router.get('/:id/create-org', isAuthenticated, function(req, res, next) {
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
    .exec(function(err, commun){
      if (err) return handleError(err);
      res.render('comm', { title: commun.name + ' - ', data: commun, user: req.user});
    });
});

/* Handle  POST */
router.post('/:id/join', exports.update = function ( req, res ){
	// add community to users
	Users.findByIdAndUpdate(
		req.user.id,
		{ "$addToSet" : { "communities" : req.params.id } },
		{ upsert : true},
		function(err, model) {
        	console.log(err);
   		}
	);

	// add user to communities
	Communities.findByIdAndUpdate(
		req.params.id,
		{ "$addToSet" : { "members" : req.user.id } },
		{ upsert : true},
		function(err, model) {
        	console.log(err);
   		}
	);

	// add to activity feed
	var newActivity = new Activity({
      user: req.user.id,
      desttype: 'community',
      dest: req.params.id,
      details: 'join'
    })
    console.log("ACTIVITY: " + newActivity)

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

	Communities.findByIdAndUpdate(
		req.params.id,
		{ "$pull" : { "members" : req.user.id } },
		function(err, model) {
        	console.log(err);
   		}
	);
	res.redirect('/community/' + req.params.id);
});

module.exports = router;