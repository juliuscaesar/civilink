var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Users = require('../models/Users.js');
var Tasks = require('../models/Tasks.js');

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
  res.render('tasks', { title: 'My Tasks - ', user: req.user });
});

/* Handle Assign me POST */
router.post('/:id/assign', exports.update = function ( req, res ){
    Tasks.findByIdAndUpdate(
    req.params.id,
    { "$addToSet" : { "assigned" : req.user.id } },
    { upsert : true},
    function(err, model) {
          console.log(err);
          res.redirect('/idea/' + model.project);
      }
  );
});

router.post('/:id/unassign', exports.update = function ( req, res ){
  Tasks.findByIdAndUpdate(
    req.params.id,
    { "$pull" : { "assigned" : req.user.id } },
    function(err, model) {
          console.log(err);
          res.redirect('/idea/' + model.project);
      }
  );  
});

module.exports = router;