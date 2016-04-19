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

/* GET dashboard page. */
router.get('/dashboard', isAuthenticated, function(req, res, next) {
  Activity.find({})
  .populate('user dest')
  .exec(function (err, activityData) {
    res.render('dashboard', { title: 'Dashboard - ', user: req.user, feed: activityData });
  });
});

module.exports = router;
