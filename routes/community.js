var express = require('express');
var router = express.Router();

/* GET community page. */
router.get('/', function(req, res, next) {
  res.render('community', { title: 'Community - ' });
});

module.exports = router;