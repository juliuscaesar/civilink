var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/Users.js');
var Follow = require('../models/Follows.js');
var Memberships = require('../models/Memberships.js');
var Activity = require('../models/Activities.js');

/*
* GET Profile information
* Returns: User object, list of followers, list of following
*          Community memberships, and activity data
*/
exports.getProfile = function(req, res, next) {
  Users.findOne({ 'username' : req.params.id }, function (err, person) {
    if (err) {
      res.status(203);
    }
    if (person == null) {
      res.status(404);
    }
    else {
      Users.findOne({ "username" : req.params.id}, function (err, userId) {
        if (err) return console.log(err);

        Follow.find({ "follower" : userId.id}, function (err, following) {
          if (err) return console.log(err);
          Follow.find({ "followee" : userId.id }, function (err, followers) {
            if (err) return console.log(err);

            Memberships.find({ "user" : userId.id })
            .populate('community')
            .exec(function (err, memberships) {

              Activity.find({ "user" : userId.id})
              .populate('user community project task org')
              .exec(function (err, activityData) {

                res.status(200).json({ "profile": person, "following": following, "followers": followers,
                "communities": memberships, "activity": activityData });
              })
            })
          })
        })
      })
    }
  })
}

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
