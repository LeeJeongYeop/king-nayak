var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var nicknames = [];
server.listen(80);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.on('new user', function(nick, callback){
		if(nicknames.indexOf(nick) != -1){
			callback(false);
		}else{
			callback(true);
			socket.nickname = nick;
			nicknames.push(socket.nickname);
			updateNicknames();
		}
	});

	function updateNicknames(){
		io.sockets.emit('usernames', nicknames);
	}

	socket.on('send message', function(data){
		io.sockets.emit("new message", {msg:data, nick:socket.nickname});
	});

	socket.on('disconnect', function(data){
		if(!socket.nickname){ return; }
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	});
});