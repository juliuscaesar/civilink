var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Ideas = require('../models/Ideas.js');
var Users = require('../models/Users.js');
var Communities = require('../models/Communities.js');

/* GET /idea listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

/* GET /idea/id */
router.get('/:id', function(req, res, next) {
  Ideas.findById(req.params.id, function (err, idea) {
    if (err) return next(err);
    else if (idea == null) {
      res.json("Idea not found");
    }
    else {
      Communities.findById(idea.community, function(err, comm) {
        res.render('idea', { title: idea.title + ' - ', data: idea, user: req.user, IdeaCommunity: comm });
      })
	   }
  });
});

/* Handle Registration POST */
router.post('/create-idea', jsonParser, exports.update = function ( req, res ){
  var newIdea = new Ideas({
    title: req.body.title,
    desc: req.body.desc,
    community: req.body.community,
    user: req.user
  })


  newIdea.save( function ( err, user, count ){
    
    Communities.findByIdAndUpdate(
      req.body.community,
      { "$addToSet" : { "ideas" : newIdea.id } },
      { upsert : true},
      function(err, model) {
            console.log(err);
        }
    );

    res.redirect('/idea/' + newIdea.id);
  });
});

module.exports = router;