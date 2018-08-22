var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // TODO fix this ugly path
  res.json(require('../../data/data.json'));
});

module.exports = router;
