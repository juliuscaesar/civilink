var express = require('express');
var router = express.Router();

/* GET Boston page. */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard');
});

module.exports = router;