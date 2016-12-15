var express = require('express');
var router = express.Router();

var Activities = require('../models/Activities.js');


/* GET dashboard page. */
exports.getFeed = function(req, res, next) {
  Activities.find({})
  .populate('user community')
  .exec(function (err, activityData) {
  	if (err) {
  	    res.status(203);
  	}
  	else {
  		res.status(200).json({"feed": activityData})
  	}    
  });
}