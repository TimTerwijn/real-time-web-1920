const express = require('express');
const app = express();

//set port listener 
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

//set public folder
app.use(express.static('client/public'));

const io = require('socket.io').listen(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
    socket.on('new-data', function(data){
        io.emit('new-data', data);
        console.log('message: ' + data.message + " | x:" + data.x);
    });
});

