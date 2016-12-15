var express = require('express');
var passport = require('passport');
var router = express.Router();


/* GET sign up page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Sign up! - ', message: req.flash('message'), user: req.user } );
});

module.exports = router;