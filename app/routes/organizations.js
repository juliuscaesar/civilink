var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var sanitizeHtml = require('sanitize-html');

var mongoose = require('mongoose');
var Communities = require('../models/Communities.js');
var Users = require('../models/Users.js');
var Events = require('../models/Events.js');
var Memberships = require('../models/Memberships.js');
var Ideas = require('../models/Projects.js');
var Orgs = require('../models/Orgs.js');
var Activity = require('../models/Activities.js');
var Projects = require('../models/Projects.js');


/* GET Organization
   Send to Organization page after populating the community,
   members fields.
   NOTE: the supporters fields technically refers to users as well, but
   is not populated. This is because mongoose has no .contains() method, and in
   order to check if the user is a supporter we simply keep supporters as user _ids
   and call .indexOf(me) on it.
  */
exports.getOrg = function(req, res, next) {
  var organization = [];

  Orgs.findById(req.params.id, function (err, org) {
      if (err) {
        res.status(203);
      }
      if (org == null) {
        res.status(203).json({"errorMessage": "Organization not found"});
      }
      else {
        organization = org;
        // send data
        res.status(200).json({"organization": organization});
      }
    });
}
