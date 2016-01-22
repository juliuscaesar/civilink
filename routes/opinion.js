var express = require('express');
var router = express.Router();

/* GET Opinion page. */
router.get('/', function(req, res, next) {
  res.render('opinion', { title: 'Opinion - ' });
});

module.exports = router;