var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Users = require('../models/Users.js');
var Tasks = require('../models/Tasks.js');
var PendPoints = require('../models/PendPoints.js');
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
  Tasks.find({ "assigned" : req.user.id })
    .populate('project')
    .exec(function (err, myTasks) {
      if (err) return console.log(err);
        Tasks.find({ "creator" : req.user.id })
          .populate('assigned project')
          .exec(function (err, adminTasks) {
            if (err) return console.log(err);
            PendPoints.find({ "user" : req.user.id, "awarded" : false })
            .populate('task')
            .exec(function (err, pendingPoints) {
              PendPoints.find({ "admin" : req.user.id, "awarded" : false })
              .populate('task user')
              .exec(function (err, pendingGrants) {
                res.render('tasks', { title: 'My Tasks - ', user: req.user, assignedTasks: myTasks, adminTasks: adminTasks,
                  pendingGrants: pendingGrants, pendingPoints: pendingPoints});
            });
          });
        });
    });
});
       

/* Handle Assign me POST */
router.post('/:id/assign', exports.update = function ( req, res ){
    Tasks.findByIdAndUpdate(
    req.params.id,
    { "$addToSet" : { "assigned" : req.user.id } },
    { upsert : true},
    function(err, model) {
      console.log(err);

      // add to activity feed
      var newActivity = new Activity({
        user: req.user.id,
        desttype: 'Tasks',
        dest: req.params.id,
        details: 'started working on'
      })


      newActivity.save( function ( err, user, count ){
        if (err) return console.log(err);
      });

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

      // add to activity feed
      var newActivity = new Activity({
        user: req.user.id,
        desttype: 'Tasks',
        dest: req.params.id,
        details: 'stopped working on'
      })


      newActivity.save( function ( err, user, count ){
        if (err) return console.log(err);
      });
        res.redirect('/idea/' + model.project);
    }
  );  
});

/* Handle Registration POST */
router.post('/:id/complete', jsonParser, exports.update = function ( req, res ){
  Tasks.findById(req.params.id)
  .populate('creator')
  .exec(function (err, theTask) {
    var newPendPoints = new PendPoints({
      task: req.params.id,
      user: req.user.id,
      admin: theTask.creator.id
    })

    newPendPoints.save( function ( err, user, count ) {
      if (err) console.log(err);
    });
  });
  
  // add to activity feed
  var newActivity = new Activity({
    user: req.user.id,
    desttype: 'Tasks',
    dest: req.params.id,
    details: 'completed'
  })


  newActivity.save( function ( err, user, count ){
    if (err) return console.log(err);
  });

  res.redirect('/tasks');
});

/* Handle Registration POST */
router.post('/:id/award/', jsonParser, exports.update = function ( req, res ){
  PendPoints.findById( req.params.id)
  .populate('user task')
  .exec(function ( err, thePend ){
    thePend.awarded = true;

    thePend.save( function ( err, user, count ){

      Users.findById( thePend.user.id, function ( err, user ){
        user.points = user.points + thePend.task.points;

        user.save( function ( err, user, count ){
          if (err) console.log(err);

          Tasks.findByIdAndUpdate(
            thePend.task.id,
            { "$pull" : { "assigned" : thePend.user.id } },
            function(err, model) {
              console.log(err);
              }
          );

          Tasks.findByIdAndUpdate(
            thePend.task.id,
            { "$addToSet" : { "status" : thePend.user.id } },
            { upsert : true},
            function(err, model) {
              console.log(err);
             }
          );



          res.redirect('/tasks/');
        });
      });
    });

  });
});

module.exports = router;