var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Communities = require('../models/Communities.js');
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
/* GET Edit-profile page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('create-community', { title: 'Create Community - ', user: req.user });
});

/* Handle Registration POST */
router.post('/', jsonParser, exports.update = function ( req, res ){
  var newComm = new Communities({
  	name: req.body.name,
  	desc: req.body.desc,
  	creator: req.user
  })
  
  // add to activity feed
  var newActivity = new Activity({
      user: req.user.id,
      desttype: 'Communities',
      community: newComm.id,
      details: 'created'
    })


    newActivity.save( function ( err, user, count ){
      if (err) return console.log(err);
    });

  newComm.save( function ( err, user, count ){
    res.redirect('/community/');
  });
});

module.exports = router;