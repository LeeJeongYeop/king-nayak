var mongoose = require('mongoose');
var uri = 'mongodb://nayak:1234@ds031822.mongolab.com:31822/heroku_app35929700/Blog';
var options = {
	server: { poolSize : 100 }
};
var db = mongoose.createConnection(uri, options);

db.on('error', function(err){
	if(err){ console.error('db err', err) };
});

db.once('open', function callback(){
	console.info('Mongodb connected successfully');
});

module.exports = db;