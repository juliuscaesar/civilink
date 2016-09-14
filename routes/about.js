var express = require('express');
var router = express.Router();

/* GET Petition page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'What we do - ', user: req.user });
});

module.exports = router;