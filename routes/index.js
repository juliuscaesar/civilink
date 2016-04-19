var express = require('express');
var router = express.Router();
var passport = require('passport');

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

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      Activity.find({})
      .populate('user dest')
      .exec(function (err, activityData) {
        res.render('dashboard', { title: 'Dashboard - ', user: req.user, feed: activityData });
      });
    }
      // Display the Login page with any flash message, if any
    else {
      res.render('index', { title: "", message: req.flash('message'), user: req.user });
    }
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash : true  
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/sign-up',
    failureFlash : true  
  }));

  /* GET Home Page */
  router.get('/dashboard', isAuthenticated, function(req, res){
    Activity.find({})
    .populate('user dest')
    .exec(function (err, activityData) {
      res.render('dashboard', { title: "Dashboard - ", user: req.user, feed: activityData });
    });
  });

  /* Handle Logout */
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}