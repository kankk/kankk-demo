var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({success: true, data: 'nice to meet you'});
  console.log('work');
});

module.exports = router;
