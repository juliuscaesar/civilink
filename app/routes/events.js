var express = require('express');
var router = express.Router();

/* GET Events page. */
router.get('/', function(req, res, next) {
  res.render('events', { title: 'Events - ', user: req.user });
});

module.exports = router;