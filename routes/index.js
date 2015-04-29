var express = require('express');
var router = express.Router();
var db = require('../models/db');
require('../models/boardmodel');
var BoardModel = db.model('Board');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('index.js [router.get] req.session.auth_id', req.session.auth_id);
	BoardModel.find({}).sort('regdate').exec(function(err, docs){
		if(err){ console.error('err',err); }
		console.log('docs', docs);
		res.render('index',{docs: docs,	auth_id: req.session.auth_id});
	});
});

router.get('/profile', function(req, res, next){
	res.render('profile',{auth_id: req.session.auth_id});
});

module.exports = router;
