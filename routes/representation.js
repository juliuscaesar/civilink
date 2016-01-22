var express = require('express');
var router = express.Router();

/* GET representation page. */
router.get('/', function(req, res, next) {
  res.render('representation', { title: 'Representation - ' });
});

module.exports = router;