var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Ideas = require('../models/Ideas.js');
var Users = require('../models/Users.js');

/* GET /idea listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

/* GET /idea/id */
router.get('/:id', function(req, res, next) {
  Users.findById(req.params.id, function (err, idea) {
    if (err) return next(err);
    if (idea == null) {
      res.json("Idea not found");
    }
    else {
      res.render('idea', { data: idea, user: req.user });
	}
  });
});

/* Handle Registration POST */
router.post('/create-idea', jsonParser, exports.update = function ( req, res ){
  var newComm = new Ideas({
    title: req.body.title,
    desc: req.body.desc,
    community: req.body.community,
    user: req.user
  })

  newComm.save( function ( err, user, count ){
    res.redirect('/idea/#{newComm.id}');
  });
});

module.exports = router;