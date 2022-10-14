var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  res.send( { message: 'Please, add your bike journey information!' });
});

module.exports = router;