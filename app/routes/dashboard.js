var express = require('express');
var router = express.Router();

var Activities = require('../models/Activities.js');


/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
  Activities.find({})
  .populate('user community project idea task org')
  .exec(function (err, activityData) {
  	if (err) {
  	}
  	else {
  		res.status(200).json({"feed": activityData})
  	}    
  });
});

module.exports = router;
