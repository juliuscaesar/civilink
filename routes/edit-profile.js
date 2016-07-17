var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var multer = require('multer');

var mongoose = require('mongoose');
var Users = require('../models/Users.js');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}
/* GET Edit-profile page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('edit-profile', { title: 'Edit Profile - ', user: req.user });
});

/* Handle Registration POST */
router.post('/', jsonParser, exports.update = function ( req, res ){
  Users.findById( req.user.id, function ( err, user ){
    console.log("New First Name:" + req.body.newFirstName);
    user.firstName = req.body.newFirstName;
    user.lastName = req.body.newLastName;
    user.city = req.body.newCity;
    user.state = req.body.newState;
    user.occ = req.body.newOcc;
    user.occplace = req.body.newOccplace;
    user.bio = req.body.newBio;
    user.save( function ( err, user, count ){
      res.redirect('/profile/' + req.user.username);
    });
  });
});

/* Handle Registration POST */
router.post('/picture', multer({ dest: './public/images/uploads'}).single('upl'), function(req,res){
  console.log(req.body); //form fields
  /* example output:
  { title: 'abc' }
   */
  console.log(req.file); //form files
  /* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
   */
   res.status(204).end();
   // Add image to user
   Users.findById( req.user.id, function ( err, user ) {
     user.avatar = req.file.filename;
     user.save( function ( err, user, count) {
        if (err) return console.log(err);
     });
    if (err) return console.log(err);
   });
  res.redirect('/profile/' + req.user.username);

});

module.exports = router;