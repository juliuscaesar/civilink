var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');

var Communities = require('../models/Communities.js');
var Users = require('../models/Users.js');
var Events = require('../models/Events.js');
var Memberships = require('../models/Memberships.js');
var Ideas = require('../models/Projects.js');
var Orgs = require('../models/Orgs.js');
var Activity = require('../models/Activities.js');
var Projects = require('../models/Projects.js');


/* GET all communities
 *  (Where all of the user's communities are listed)
 *   NOTE: currently passes ALL Community documents, this obviously needs
 *   to change at some point, but for now it works since there aren't too many.
 */
exports.allCommunities = function(req, res, next) {
	Communities.find({}, function(err, data){
	    if (err) {
            res.status(203);
	    } else {
	        res.status(200).json({"communities": data});
	    }
	})
}

/* GET community
 * :id - the id of the community to display
 * populates the orgs and ideas fields
 * NOTE: the members fields technically refers to users as well, but
 * is not populated. This is because mongoose has no .contains() method, and in
 * order to check if the user is a supporter we simply keep supporters as user _ids
 * and call .indexOf(me) on it.
 */
exports.getCommunity = function(req, res, next) {
    var community = [];
    var members = [];
    var projects = [];
		var organizations = [];

	Communities.findOne({"url": req.params.id})
    .exec(function (err, commun) {
        if (err) {
            return res.status(500).json({
							"errorMessage": "Could not get community data"});
        }
        else if (commun == null) {
            return res.status(404).json({
							"errorMessage": "That community does not exist"});
            // should go back to dashboard
        }
        else {
            community = commun;
        }

        Memberships.find({ "community" : commun.id })
            .populate('user')
            .exec(function (err, memberships) {

            if (err) {
               res.status(500).json({
								"errorMessage": "Could not find memberships"});
            }
            else {
                members = memberships;
            }

        Projects.find({ "community" : commun.id })
            .populate('user')
            .exec(function (err, projects) {

            if (err) {
                res.status(500).json({
									"errorMessage": "Could not find projects"});
            }
            else {
                projects = projects;
            }

						Orgs.find({ "community" : commun.id })
		            .exec(function (err, orgs) {

		            if (err) {
		                res.status(500).json({
											"errorMessage": "Could not find organizations"});
		            }
		            else {
		                organizations = orgs;
		            }

		            // send data
		            res.status(200).json({
									"community": community,
									"members": members,
									"projects": projects,
									"organizations": organizations});
		            })
            })
        })

    })
}
