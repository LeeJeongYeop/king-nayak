var express = require('express');
var router = express.Router();
var db = require('../models/db');
require('../models/membermodel');
var MemberModel = db.model('Member');

/*********/
/*권한등록*/
/*******/
router.post('/join', function(req, res, next){
	console.log('req.body', req.body);
	var id = req.body.id;
	var password = req.body.password;
	var member = new MemberModel({
		id: id,
		password: password
	});
	member.save(function(err, doc){
		if(err){ console.error('err', err); }
		console.log('doc', doc);
		res.redirect('/');
	});
});

/*********/
/* 로그인 */
/*******/
router.post('/login', function(req, res, next){
	console.log('req.body', req.body);
	var id = req.body.id;
	var password = req.body.password;
	var contition = {id:id, password:password};
	MemberModel.findOne(contition, function(err, doc){
		if(err){ console.error('err', err); }
		if(doc){
			req.session.auth_id = doc.id;
			console.log("memeber.js [router.post] req.session.auth_id", req.session.auth_id);
			console.log("ok");
			res.redirect('/');
		}else{
			console.log("no");
			res.send("<script>alert('인증 실패');history.back();</script>");
		}
	});	
});

module.exports = router;