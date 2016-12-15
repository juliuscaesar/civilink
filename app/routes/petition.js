var express = require('express');
var router = express.Router();

/* GET Petition page. */
router.get('/', function(req, res, next) {
  res.render('petition', { title: 'Recall Governor Baker! - ', user: req.user });
});

module.exports = router;