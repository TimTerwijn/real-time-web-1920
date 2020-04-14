const express = require('express');
const api = require("./server/Api.js");
const { v4: uuidv4 } = require('uuid');

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

let counter = 0;
const users = {};
io.on('connection', function(socket){
    
    const id = uuidv4();//random string
    let username = "Harry Potter";

    socket.on('create-account', function(_username){
        //set username
        username = _username;
        
        //safe user
        users[id] = username;

        //share id with client
        io.emit('store-id', id);
        
        //notify client
        const message = `${_username} has joined!`;
        io.emit('server-message', message);
        
        //notify server
        console.log(message);
    });

    socket.on('login', function(id){
        //get username
        username = users[id];
        
        const message = `${username} has joined!`;
        io.emit('server-message', message);
        console.log(message);
    });
    
    socket.on('disconnect', function(){
        const message = `${username} has left...`;

        io.emit('server-message', message);
        console.log(message);
    });
    
    socket.on('client-message', function(data){
        io.emit('client-message', data);
        console.log('message: ' + data.message + " | x:" + data.left);
    });

    //socket.emit
    //socket.broadcast.emit
});