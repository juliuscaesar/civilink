var express = require('express');
var router = express.Router();

/* GET Ideas page. */
router.get('/', function(req, res, next) {
  res.render('ideas', { title: 'Ideas - ' });
});

module.exports = router;