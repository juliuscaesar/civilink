var express = require('express');
var router = express.Router();

/* GET Idea page. */
router.get('/', function(req, res, next) {
  res.render('idea', { title: 'Idea - ' });
});

module.exports = router;