var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Ideas = require('../models/Ideas.js');
var Orgs = require('../models/Orgs.js');
var Users = require('../models/Users.js');
var Communities = require('../models/Communities.js');

/* GET /idea listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

/* GET /orgs/id */
router.get('/:id', function(req, res, next) {
  Orgs.findById(req.params.id, function (err, org) {
    if (err) return next(err);
    if (org == null) {
      res.json("Organization not found");
    }
    else {
      Communities.findById(org.community, function(err, comm) {
        Users.find({
          '_id': { $in: org.members }
        }, function(err, docs){
          res.render('orgs', {title: org.title + ' - ', data: org, user: req.user, OrgCommunity: comm, membs: docs});
        });
      });
	}
  });
});

/* Handle Registration POST */
router.post('/create-org', jsonParser, exports.update = function ( req, res ){
  var newOrg = new Orgs({
    title: req.body.title,
    desc: req.body.desc,
    community: req.body.community,
    user: req.user
  })

  newOrg.save( function ( err, user, count ){
    Communities.findByIdAndUpdate(
      req.body.community,
      { "$addToSet" : { "orgs" : newOrg.id } },
      { upsert : true},
      function(err, model) {
            console.log(err);
        }
    );

    Orgs.findByIdAndUpdate(
    newOrg.id,
    { "$addToSet" : { "members" : req.user.id } },
    { upsert : true},
    function(err, model) {
          console.log(err);
      }
  );
    res.redirect('/orgs/' + newOrg.id);
  });
});


/* GET /idea/id/support */
router.post('/:id/support', exports.update = function ( req, res ){
    Orgs.findByIdAndUpdate(
    req.params.id,
    { "$addToSet" : { "supporters" : req.user.id } },
    { upsert : true},
    function(err, model) {
          console.log(err);
      }
  );
  res.redirect('/orgs/' + req.params.id);
});

/* Handle  POST */
router.post('/:id/remove', exports.update = function ( req, res ){
  Orgs.findByIdAndUpdate(
    req.params.id,
    { "$pull" : { "supporters" : req.user.id } },
    function(err, model) {
          console.log(err);
      }
  );
  res.redirect('/orgs/' + req.params.id);
});

module.exports = router;