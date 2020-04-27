const { v4: uuidv4 } = require('uuid');

//all users
const users = {};

function set(io){
    //global room
    io.on('connection', function(socket){
        
        socket.on('register', function(username){       
            //generate unique user id
            const userId = uuidv4();
            
            //safe user
            users[userId] = username;
    
            //share id with client
            socket.emit('store-userId', userId);
            
            //notify server
            console.log(`User ${username} has created an account and joined the global room`);

            //join a room
            joinRoom(io, socket, username);
        });
    
        socket.on('login', function(userId){
            //get username
            username = users[userId];
            
            //notify server
            console.log(`User ${username} has joined the global room`);

            //join a room
            joinRoom(io, socket, username);
        });
    });
}

function joinRoom(io, socket, username){

    const room = getRoom(io, socket);       

    //private room
    room.on('connection', function(socket){

        //notify server
        console.log(`User ${username} has joined room: ` + room);
        
        socket.on('disconnect', function(){
            const message = `${username} has left the room`;

            socket.emit('server-message', message);
            console.log(message);
        });
        
        socket.on('client-message', function(data){
            socket.emit('client-message', data);
            console.log('message: ' + data.message + " | x:" + data.left);
        });
    });
}

//true if someone is alone in a room
let hasRoomAvailable = false;

//all rooms
const roomNames = [];

function getRoom(io, socket){
    //check if another user already created a room
    if(hasRoomAvailable){     
        //reverse boolean
        hasRoomAvailable = !hasRoomAvailable;

        //get last room name
        const roomName = roomNames[rooms.length - 1];

        //send room to client
        socket.socket.emit('join-room', roomName);

        //join the room
        const room = io.of(roomName);

        //return room
        return room;
    }else{
        //reverse boolean
        hasRoomAvailable = !hasRoomAvailable;

        //generate unique id
        const roomID = uuidv4();
        const roomName = `/room:${roomID}`;

        //add room name to room list
        roomNames.push(roomName);

        //send room to client
        socket.socket.emit('join-room', roomName);

        //create a new room
        const room = io.of(roomName);

        //return room
        return room;
    }    
}

module.exports = {
    set,
}