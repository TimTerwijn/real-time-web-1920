//get libiries
const { v4: uuidv4 } = require('uuid');

//get modules
const User = require("../server/objects/User.js");
const Room = require("../server/objects/Room.js");

//all users
const users = {};

function set(io){
    //global room
    io.on('connection', function(socket){
        
        let user;
        let room;

        socket.on('register', function(username){       
            //generate unique user id
            const userId = uuidv4();
            
            //safe user
            user = new User(userId, username);

            //add user to map
            users[userId] = user;

            //notify server
            console.log(`User ${username} has created an account`);
    
            //share id with client
            socket.emit('store-userId', userId);            

            //join room
            room = getRoom(io, socket, user);         
        });
    
        socket.on('login', function(userId){
            //get username
            user = users[userId];

            if(user == undefined){
                //notify server of error
                console.log("error: someone tries to login with a wrong user ID: " + userId);

                //give user a chance to make a new account
                socket.emit('error-wrong-id');

                //stop to prevent server from crashing
                return;
            }

            username = user.getUsername();
            
            //notify server
            console.log(`User ${username} has joined`);

            //join room
            room = getRoom(io, socket, user);
        });

        socket.on('disconnect', function(){
            if(room == undefined){
                //fix crashes
                console.log("Error! room is undefined")
                return
            }

            //remove user from room
            room.removeUser(user);

            const message = `${user.getUsername()} has left the room`;

            //notify clients in room
            room.emitRoomServerMessage(message);
        
            //notify server
            console.log(message);
        });

        socket.on('on-right-key-down', function(){
            if(user == undefined){
                //fix crashes
                console.log("Error! user is undefined")
                return
            }

            user.moveRight();            
        });

        socket.on('on-right-key-up', function(){
            if(user == undefined){
                //fix crashes
                console.log("Error! user is undefined")
                return
            }

            user.stopMoving();            
        });

        socket.on('on-left-key-down', function(){
            if(user == undefined){
                //fix crashes
                console.log("Error! user is undefined")
                return
            }

            user.moveLeft();            
        });

        socket.on('on-left-key-up', function(){
            if(user == undefined){
                //fix crashes
                console.log("Error! user is undefined")
                return
            }

            user.stopMoving();            
        });
        
        socket.on('client-message', function(data){
            if(room == undefined){
                //fix crashes
                console.log("Error! room is undefined")
                return
            }

            //notify clients in room
            room.emitRoomServerMessage(message);

            //notify server
            console.log(message);
        });
    });
}

//all rooms
const rooms = [];

function getRoom(io,socket, newUser){
    //get last room
    const lastRoom = rooms[rooms.length - 1];

    //join room if last room needs a second player
    if(lastRoom != null){
        if(lastRoom.looksForPlayer()){
            //add user to room
            lastRoom.setUser2(newUser);

            const message = `${newUser.getUsername()} has joined the room`;

            //notify server
            console.log(message)

            //join room
            socket.join(lastRoom.getName());

            //render game and set player
            socket.emit('set-player', "player2");

            //notify clients in room
            lastRoom.emitRoomServerMessage(message);
    
            //return room
            return lastRoom;
        }
    }
    
    //else generate a new room

    //generate unique room id
    const roomID = uuidv4();
    const roomName = `/room:${roomID}`;

    //create room object
    const room = new Room(io, roomName, newUser);

    //add room to room list
    rooms.push(room);

    const message = `${newUser.getUsername()} has created a room`;

    //notify server
    console.log(message)

    //join room
    socket.join(room.getName());

    //render game and set player
    socket.emit('set-player', "player1");

    //notify clients in room
    room.emitRoomServerMessage(message);

    //return room object
    return room;
}

module.exports = {
    set,
}