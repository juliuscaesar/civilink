var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/Users.js');
var Follow = require('../models/Follow.js');

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
      var userId = Users.find({ "username" : req.params.username})
      var following = Follow.find({ "follower" : userId });
      var followers = Follow.find({ "followee" : userId });

      console.log("following: " + following)
      res.render('profile', { title: person.firstName + " " + person.lastName + ' - ', data: person, user: req.user, following: following, followers: followers });
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

module.exports = router;