const { v4: uuidv4 } = require('uuid');

//all users
const users = {};

function set(io){
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
    });
}

module.exports = {
    set,
}