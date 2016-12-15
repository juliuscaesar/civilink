var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/Users.js');
var Follow = require('../models/Follow.js');
var Memberships = require('../models/Memberships.js');
var Activity = require('../models/Activity.js');

/* GET /people listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

/* GET /people/id */
router.get('/:username', function(req, res, next) {
  Users.findOne({ 'username' : req.params.username }, function (err, person) {
    if (err) return next(err);
    if (person == null) {
      res.redirect('/dashboard');
    }
    else {
      Users.findOne({ "username" : req.params.username}, function (err, userId) {
        if (err) return console.log(err);

        Follow.find({ "follower" : userId.id}, function (err, following) {
          if (err) return console.log(err);
          Follow.find({ "followee" : userId.id }, function (err, followers) {
            if (err) return console.log(err);

            Memberships.find({ "user" : userId.id })
            .populate('community')
            .exec(function (err, memberships) {

              Activity.find({ "user" : userId.id})
              .populate('user community idea task org')
              .exec(function (err, activityData) {
                res.render('profile', { title: person.firstName + " " + person.lastName + ' - ', data: person, 
                  user: req.user, following: following, followers: followers, feed: activityData, communities: memberships });
              });
            });
          });
        });
      });
    }
  });
});

/* Handle  POST */
router.post('/:username/follow/:id', exports.update = function ( req, res ){
  var newFollow = new Follow({
    follower: req.user.id,
    followee: req.params.id
  })
  console.log("NEWFOLLOW: " + newFollow)

  newFollow.save( function ( err, user, count ){
  res.redirect('/profile/' + req.params.username);
  });
});

/* Handle  POST */
router.post('/:username/unfollow/:id', exports.update = function ( req, res ){
  Follow.find( { "follower" : req.user.id, "followee" : req.params.id })
  .remove().exec();    
  res.redirect('/profile/' + req.params.username);
});

module.exports = router;