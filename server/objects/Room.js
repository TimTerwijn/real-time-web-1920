const gameloop = require("../Gameloop.js");

class Room {
    
    constructor(io, name, newUser) {
        this.io = io;
        this.name = name;
        this.user1 = newUser;
        this.user2 = null;

        //start async gameloop
        gameloop.start(this)
    }

    getName(){
        return this.name;
    }

    getUser1(){
        return this.user1;
    }

    getUser2(){
        return this.user2;
    }

    setUser2(newUser){
        this.user2 = newUser;
    }

    looksForPlayer(){
        return this.user2 === null && this.user1 !== null;
    }

    removeUser(user){
        if(this.user1 === user){
            this.user1 = null;
        }else if(this.user2 === user){
            this.user2 = null;
        }
    }
    
    emitRoomMessage(name, value){
        this.io.to(this.name).emit(name, value);
    }

    emitPlayerX(){
        const name = "emitPlayerX";
        const playerCoordinates = {
            "player1X": 0,
            "player2X": 0,
        }

        if(this.user1 != undefined){
            playerCoordinates["player1X"] = this.user1.getX();
        }

        if(this.user2 != undefined){
            playerCoordinates["player2X"] = this.user2.getX();
        }

        this.emitRoomMessage(name, playerCoordinates);
    }

    emitRoomServerMessage(message){
        const name = "server-message";
        this.emitRoomMessage(name, message);
    }

    userHasVelocity(){
        let hasVelocity = 0;
        if(this.user1 != undefined){
            if(this.user1.hasVelocity()){
                hasVelocity++;
            }
        } 

        if(this.user2 != undefined){
            if(this.user2.hasVelocity()){
                hasVelocity++;
            }
        } 

        return hasVelocity > 0;
    }
}

module.exports = Room;