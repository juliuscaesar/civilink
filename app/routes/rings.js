var express = require('express');
var router = express.Router();

/* GET rings page. */
router.get('/', function(req, res, next) {
  res.render('rings', { title: 'Rings - ', user: req.user });
});

module.exports = router;