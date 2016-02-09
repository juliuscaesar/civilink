var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Communities = require('../models/Communities.js');
var Ideas = require('../models/Ideas.js');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

/* Handle Registration POST */
router.post('/', jsonParser, exports.update = function ( req, res ){
  var newComm = new Ideas({
  	title: req.body.title,
  	desc: req.body.desc,
  	community: req.body.community,
    user: req.user
  })

  newComm.save( function ( err, user, count ){
    res.redirect('/idea/#{newComm.id}');
  });
});

module.exports = router;