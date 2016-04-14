var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var mongoose = require('mongoose');
var Ideas = require('../models/Ideas.js');
var Orgs = require('../models/Orgs.js');
var Users = require('../models/Users.js');
var Communities = require('../models/Communities.js');

/* Redirect to Dashboard if no org id specified */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

/* GET /orgs/id 
   Send to Organization page after populating the community,
   members fields.
   NOTE: the supporters fields technically refers to users as well, but
   is not populated. This is because mongoose has no .contains() method, and in
   order to check if the user is a supporter we simply keep supporters as user _ids
   and call .indexOf(me) on it.
  */
router.get('/:id', function(req, res, next) {
  Orgs.findById(req.params.id)
    .populate('community members')
    .exec(function (err, org) {
      if (err) return handleError(err);
      res.render('orgs', {title: org.title + ' - ', data: org, user: req.user});
    });
});

/* Handle Create Organization POST
   set up newOrg variable, save it
   and add user to members list (done separately but this could change)
 */
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


/* Handle Support Organization POST */
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

/* Handle Remove me from Organization POST 
   AKA unsupport Organization
   */
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