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
var Activities = require('../models/Activities.js');

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
      res.status(500).json({"errorMessage":"Could not get project data"});
    }
    else if (proj == null) {
      res.status(404).json({"errorMessage":"Project does not exist"});
      // should go back to dashboard
    }
    else {
      project = proj;

      Tasks.find({ "project" : proj.id })
      .populate('assigned creator')
      .exec(function(err, tasks) {
        if (err) {
          res.status(500).json({"errorMessage":"Could not get task data"});
        }
        tasks = tasks;
        // send data
        res.status(200).json({"project": project, "tasks": tasks});
      });
    }
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
    newProject.title = sanitizeHtml(req.body.title, { allowedTags: [] });
    newProject.desc = sanitizeHtml(req.body.desc, { allowedTags: [] });
    newProject.causes = req.body.causes;
    newProject.community = req.body.community;
    newProject.user = foundUser;
    newProject.url = sanitizeHtml(req.body.title, { allowedTags: [] }).toLowerCase().split(" ").join("-");

    // save the project
    newProject.save(function(err) {
      if (err){
        res.status(500).json({"error": "Could not create project"});
      }
    });

    var newActivity = new Activities();
    newActivity.user = foundUser;
    newActivity.details = "created";
    newActivity.desttype = "Projects";
    newActivity.project = newProject;

    newActivity.save(function(err) {

    });

    res.status(201).json({
      project: newProject
    });
  })
}
