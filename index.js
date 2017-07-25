var app = require('express')();
var fs = require('fs');
var credentials = {
	key: fs.readFileSync('apache-selfsigned.key'),
	cert: fs.readFileSync('apache-selfsigned.crt')
  };
  
var https = require('https').Server( credentials, app );
var io = require('socket.io')(https);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

https.listen( 5000, function(){
	console.log('listening on *:5000');
});

// /usr/lib/httpd/ssl/private/apache-selfsigned.key
// /usr/lib/httpd/ssl/certs/apache-selfsigned.crt

io.on('connection', function(socket){
	console.log('A User Connected');
	io.emit('chat message', 'A User Connected');

	socket.on('disconnect', function(){
		io.emit('chat message', 'User Disconnected');
		console.log('User Disconnected');
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


