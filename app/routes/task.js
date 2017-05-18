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
* Creates a task
*/
exports.createTask = function(req, res, next) {
  var newTask = new Tasks();

  // set the project's information


  var user = Authenticate.getLoggedinUser(req.headers.token);
  Users.findOne({ "username" : user }, {_id:1})
  .exec(function (err, foundUser) {
    newTask.title = sanitizeHtml(req.body.title);
    newTask.desc = sanitizeHtml(req.body.desc);
    newTask.needed = req.body.needed;
    newTask.points = req.body.points;
    newTask.project = req.body.project;
    newTask.creator = foundUser;

    // save the task
    newTask.save(function(err) {
      if (err){
        console.log(err);
        res.status(500).json({"error": "Could not create task"});
      }
      else {
        res.status(201).json({
          task: newTask
        });
      }
    });
  })
}
