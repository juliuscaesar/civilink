var express = require('express');
var router = express.Router();
var Authenticate = require('../passport/authentication');
var Activities = require('../models/Activities.js');
var User = require('../models/Users.js');
var Projects = require('../models/Projects.js');


/*
 * Returns activity feed for dashboard.
 */
exports.getFeed = function(req, res, next) {
  Activities.find({})
  .populate('user community task project')
  .exec(function (err, activityData) {
  	if (err) {
  	    res.status(203);
  	}
  	else {
      var user = Authenticate.getLoggedinUser(req.headers.token);
      User.find({ "username" : user })
      .exec(function (err, foundUser) {
  		    res.status(200).json({"feed": activityData, "user": foundUser})
      })
  	}
  });
}

/*
 * Returns the projects for the Dashboard.
 * Right now just returns every project in DB.
 */
exports.getProjects = function(req, res, next) {
  Projects.find({})
  .populate('user community')
  .exec(function (err, projects) {
  	if (err) {
  	    res.status(203);
  	}
  	else {
      var user = Authenticate.getLoggedinUser(req.headers.token);
      User.find({ "username" : user })
      .exec(function (err, foundUser) {
  		    res.status(200).json({"projects": projects, "user": foundUser})
      })
  	}
  });
}
