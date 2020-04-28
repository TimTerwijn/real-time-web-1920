function start(room){
    //start async gameloop
    setTimeout(gameloop, 100, room);
}

//private async
function gameloop(room){
    //do a tick
    // console.log("tick!");

    if(room.user1 != undefined){
        if(room.user1.hasVelocity()){
            //calc position
            room.user1.calcNewPosition();
        }        
    }

    if(room.user2 != undefined){
        if(room.user1.hasVelocity()){
            room.user2.calcNewPosition();
        }
    }

    if(room.userHasVelocity()){
        //broadcast position
        room.emitPlayerX();
    }
         
    setTimeout(gameloop, 100, room);
}

module.exports = {
    start,
}