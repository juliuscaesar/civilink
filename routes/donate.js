var express = require('express');
var router = express.Router();

/* GET Petition page. */
router.get('/', function(req, res, next) {
  res.render('donate', { title: 'Donate now! - ', user: req.user });
});

module.exports = router;