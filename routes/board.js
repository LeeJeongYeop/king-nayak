var express = require('express');
var router = express.Router();
var db = require('../models/db');
require('../models/boardmodel');
var BoardModel = db.model('Board');

/*********/
/* 글쓰기 */
/*******/
router.get('/write', function(req, res, next) {
	res.render('writeform', {title: '글쓰기', auth_id: req.session.auth_id});
});

router.post('/write', function(req, res, next){
	console.log('req.body', req.body);
	var title = req.body.title;
	var content = req.body.content;
	var board = new BoardModel({
		title: title,
		content: content,
		id: req.session.auth_id
	});
	board.save(function(err, doc){
		if(err){ console.error('err', err); }
		console.log('doc', doc);
		res.redirect('/board/list');
	});
});

/*********/
/* 글목록 */
/*******/
router.get('/list', function(req, res, next){
	BoardModel.find({}).sort('regdate').exec(function(err, docs){
		if(err){ console.error('err',err); }
		console.log('docs', docs);
		res.render('list',{title: 'My Content List', docs: docs,
			auth_id: req.session.auth_id});
	});
});

/*********/
/* 글읽기 */
/*******/
router.get('/read/:num', function(req, res, next){
	var num = req.params.num;
	var condition = {num:num};
	BoardModel.find(condition, function(err, docs){
		if(err){ console.error(err); }
		console.log('docs', docs);
		res.render('read', {data:docs[0], auth_id: req.session.auth_id});
	});
});

/*********/
/* 글수정 */
/*******/
router.get('/update/:num', function(req, res, next){
	var num = req.params.num;
	BoardModel.findOne({num:num}, function(err, doc){
		if(err){ console.error('err', err); }
		console.log('doc', doc);
		res.render('updateform', {title:'글 수정', data:doc, auth_id: req.session.auth_id});
	});
});

router.post('/update', function(req, res, next){
	var num = req.body.num;
	var title = req.body.title;
	var content = req.body.content;
	var data={
		title: title,
		content: content
	};
	BoardModel.update({num:num}, data, function(err, doc){
		if(err){ console.error('err', err); }
		console.log('doc', doc);
		if(doc.n == 1){
			res.redirect('/board/read/'+num);
		}else{
			res.send("<script>alert('동작 오류');history.back();</script>");
		}
	});
});

/*********/
/* 글삭제 */
/*******/
router.post('/delete', function(req, res, next){
	var num = req.body.num;
	BoardModel.remove({num:num}, function(err, doc){
		if(err){ console.error('err', err); }
		console.log('doc', doc);
		if(doc.result.n == 1){
			res.redirect('/board/list');
		}else{
			res.send("<script>alert('동작 오류');history.back();</script>");
		}
	});
});

module.exports = router;