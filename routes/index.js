var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { jeong: '잘생긴 정여비!!', kang: '바보는 깡미~~~뿅뿅' });
});

module.exports = router;
