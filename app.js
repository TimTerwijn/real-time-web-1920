const express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('client/public'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});