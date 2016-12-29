var express = require('express');
var router = express.Router();

/* GET Article page. */
router.get('/', function(req, res, next) {
  res.render('article', { title: 'My Response to #SOTU - ', user: req.user });
});

module.exports = router;