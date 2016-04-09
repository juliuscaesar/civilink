var express = require('express');
var router = express.Router();

var Communities = require('../models/Communities.js');
var Users = require('../models/Users.js');
var Events = require('../models/Events.js');
var Ideas = require('../models/Ideas.js');
var Orgs = require('../models/Orgs.js');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

/* GET community page. */
router.get('/', isAuthenticated, function(req, res, next) {
	Communities.find({}, function(err, data){
		res.render('community', { title: 'Communities - ', user: req.user, data: data });
	})
});

/* GET community page. */
router.get('/create', isAuthenticated, function(req, res, next) {
	res.render('create-community', { title: 'Create Community - ', user: req.user });
});

/* GET community page. */
router.get('/:id/create-idea', isAuthenticated, function(req, res, next) {
	Communities.findById(req.params.id, function(err, data){
		res.render('create-idea', { title: 'Create Idea - ', user: req.user, data: data });
	})
});

/* GET community page. */
router.get('/:id/create-org', isAuthenticated, function(req, res, next) {
	Communities.findById(req.params.id, function(err, data){
		res.render('create-org', { title: 'Create Organization - ', user: req.user, data: data });
	})
});

/* GET /community/id */
router.get('/:id', function(req, res, next) {
	Communities.findById(req.params.id, function (err, commun) {
		if (err) res.redirect('/dashboard');
		else if (commun == null) {
			res.redirect('/dashboard');
		}
		else {

		  Ideas.find({
            '_id': { $in: commun.ideas }
          }, function(err, ideaList){
            Orgs.find({
              '_id': { $in: commun.orgs }
            }, function(err, orgList){
              res.render('comm', { title: commun.name + ' - ', data: commun, user: req.user, ideas: ideaList, orgs: orgList});
            });
          });	
		    
		}
	});
});

/* Handle  POST */
router.post('/:id/join', exports.update = function ( req, res ){
	Users.findByIdAndUpdate(
		req.user.id,
		{ "$addToSet" : { "communities" : req.params.id } },
		{ upsert : true},
		function(err, model) {
        	console.log(err);
   		}
	);

	Communities.findByIdAndUpdate(
		req.params.id,
		{ "$addToSet" : { "members" : req.user.id } },
		{ upsert : true},
		function(err, model) {
        	console.log(err);
   		}
	);
	res.redirect('/community/' + req.params.id);
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