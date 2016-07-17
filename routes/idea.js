var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var sanitizeHtml = require('sanitize-html');

var mongoose = require('mongoose');
var Ideas = require('../models/Ideas.js');
var Users = require('../models/Users.js');
var Communities = require('../models/Communities.js');
var Tasks = require('../models/Tasks.js');
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

/* GET /idea listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

/* GET /idea/:id 
   Send to Idea(Project) page after populating the community field
  */
router.get('/:id', function(req, res, next) {
  Ideas.findById(req.params.id)
    .populate('community user')
    .exec(function (err, idea) {
      if (idea == null) {
        res.redirect('/dashboard');
      }
      else {
        Tasks.find({ "project" : req.params.id })
        .populate('assigned creator')
        .exec(function(err, tasks) {
          if (err) return handleError(err);
            res.render('idea', {title: idea.title + ' - ', data: idea, user: req.user, tasks: tasks});
         });
      }
    })
});

/* Handle Registration POST */
router.post('/create-idea', jsonParser, exports.update = function ( req, res ){
  var newIdea = new Ideas({
    title: sanitizeHtml(req.body.title, { allowedTags: [] }),
    desc: sanitizeHtml(req.body.desc, { allowedTags: [] }),
    community: sanitizeHtml(req.body.community, { allowedTags: [] }),
    user: req.user
  })

  // add to activity feed
  var newActivity = new Activity({
      user: req.user.id,
      desttype: 'Ideas',
      idea: newIdea.id,
      details: 'created'
    })


    newActivity.save( function ( err, user, count ){
      if (err) return console.log(err);
    });

  newIdea.save( function ( err, user, count ){
    
    Communities.findByIdAndUpdate(
      req.body.community,
      { "$addToSet" : { "ideas" : newIdea.id } },
      { upsert : true},
      function(err, model) {
            console.log(err);
        }
    );

    res.redirect('/idea/' + newIdea.id);
  });
});

/* GET Create Task page.
   :id - the id of the idea/project to create a task for 
   */
router.get('/:id/create-task', isAuthenticated, function(req, res, next) {
  Ideas.findById(req.params.id)
  .populate('community')
    .exec(function(err, idea){
      if (err) return handleError(err);
      res.render('create-task', { title: 'Create Task - ', data: idea, user: req.user});
    });
});

/* Handle Registration POST */
router.post('/create-task', jsonParser, exports.update = function ( req, res ){
  var newTask = new Tasks({
    title: sanitizeHtml(req.body.title, { allowedTags: [] }),
    desc: sanitizeHtml(req.body.desc, { allowedTags: [] }),
    project: sanitizeHtml(req.body.project, { allowedTags: [] }),
    needed: sanitizeHtml(req.body.needed, { allowedTags: [] }),
    creator: req.user.id,
    points: 10
  })
  
  // add to activity feed
  var newActivity = new Activity({
      user: req.user.id,
      desttype: 'Tasks',
      task: newTask.id,
      details: 'created'
    })


    newActivity.save( function ( err, user, count ){
      if (err) return console.log(err);
    });

  newTask.save( function ( err, user, count ){
    if (err) console.log(err);
    res.redirect('/idea/' + newTask.project);
  });
});

module.exports = router;