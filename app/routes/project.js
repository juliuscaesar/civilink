var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var sanitizeHtml = require('sanitize-html');
var Authenticate = require('../passport/authentication');
var mongoose = require('mongoose');
var Projects = require('../models/Projects.js');
var Users = require('../models/Users.js');
var Communities = require('../models/Communities.js');
var Tasks = require('../models/Tasks.js');

/*
* Returns data for a project
* including the associated tasks
*/
exports.getProject = function(req, res, next) {
  var project = [];
  var tasks = [];

  Projects.findOne({"url": req.params.id})
  .populate('community user')
  .exec(function (err, proj) {
    if (err) {
      res.status(203);
    }
    else if (proj == null) {
      res.status(203);
      // should go back to dashboard
    }
    else {
      project = proj;
    }
    Tasks.find({ "project" : proj.id })
    .populate('assigned creator')
    .exec(function(err, tasks) {
      if (err) {
        res.status(203);
      }
      tasks = tasks;
      // send data
      res.status(200).json({"project": project, "tasks": tasks});
    });
  })
}

/*
* Creates a project
*/
exports.createProject = function(req, res, next) {
  var newProject = new Projects();

  // set the project's information


  var user = Authenticate.getLoggedinUser(req.headers.token);
  Users.findOne({ "username" : user }, {_id:1})
  .exec(function (err, foundUser) {
    newProject.title = sanitizeHtml(req.body.title);
    newProject.desc = sanitizeHtml(req.body.desc);
    newProject.causes = ["Education", "Environment"];
    newProject.community = req.body.community;
    newProject.user = foundUser;
    newProject.url = sanitizeHtml(req.body.title).toLowerCase().split(" ").join("-");

    // save the project
    newProject.save(function(err) {
      if (err){
        res.status(500).json({"error": "Could not create project"});
      }
    });

    res.status(201).json({
      project: newProject
    });
  })
}
