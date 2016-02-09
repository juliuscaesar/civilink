var express = require('express');
var router = express.Router();

/* GET Orgs page. */
router.get('/', function(req, res, next) {
  res.render('orgs', { title: 'Organizations - ', user: req.user });
});

module.exports = router;