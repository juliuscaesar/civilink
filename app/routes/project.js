var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var sanitizeHtml = require('sanitize-html');

var mongoose = require('mongoose');
var Projects = require('../models/Projects.js');
var Users = require('../models/Users.js');
var Communities = require('../models/Communities.js');
var Tasks = require('../models/Tasks.js');

/* GET /project/:id
   Send to Project page after populating the community field
  */
exports.getProject = function(req, res, next) {
    var project = [];
    var tasks = [];

	Projects.findById(req.params.id)
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
        Tasks.find({ "project" : req.params.id })
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
