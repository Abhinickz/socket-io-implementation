var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

http.listen( 3000, function(){
	console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log('A User Connected');
	io.emit('chat message', 'A User Connected');

	socket.on('disconnect', function(){
		console.log('User Disconnected');
		io.emit('chat message', 'User Disconnected');
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('Public Message: ' + msg);
	});
	socket.on('private message', function(msg){
		io.emit('private message', msg);
		console.log('Private Message: ' + msg);
	});
});


