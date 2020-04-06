const express = require('express');
var app = express();

//set port listener 
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

//set public folder
app.use(express.static('client/public'));

var io = require('socket.io').listen(server);

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

