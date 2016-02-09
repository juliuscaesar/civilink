var express = require('express');
var router = express.Router();

var Communities = require('../models/Communities.js');
var Users = require('../models/Users.js');

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
		res.render('community', { title: 'Community - ', user: req.user, data: data });
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

/* GET /community/id */
router.get('/:id', function(req, res, next) {
	Communities.findById(req.params.id, function (err, commun) {
		if (err) res.redirect('/dashboard');
		else if (commun == null) {
			res.redirect('/dashboard');
		}
		else {
			res.render('comm', {data: commun, user: req.user });
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
	res.redirect('/community/' + req.params.id);
});

module.exports = router;