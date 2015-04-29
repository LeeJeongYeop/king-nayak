var mongoose = require('mongoose');
var db = require('../models/db');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var BoardSchema = new mongoose.Schema({
	id: String,
	password: String,
	regdate: {type: Date, default: Date.now},
});
BoardSchema.virtual('myregdate').get(function(){
	return formatDate(this.regdate);
});
BoardSchema.set('toJSON', {virtuals : true});
BoardSchema.plugin(autoIncrement.plugin, {
	model: 'Member',
	field: 'num',
	startAt: 1,
	incrementBy: 1
});
var Board = db.model('Member', BoardSchema);

function formatDate(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var day = y + '-' + (m>9? m:'0'+m) + '-' + (d>9? d:'0'+d);

	return day;
};