var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = require('../models/Users.js');

/* GET /people listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

/* GET /people/id */
router.get('/:id', function(req, res, next) {
  Users.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;