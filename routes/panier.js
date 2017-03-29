var express = require('express');
var router = express.Router();
var Order = require('../models/order');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
