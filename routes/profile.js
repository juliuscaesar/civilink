var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/Users.js');

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
      res.render('profile', { data: person, user: req.user });
	}
  });
});

module.exports = router;