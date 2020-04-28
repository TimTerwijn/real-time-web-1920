function start(room){
    //start async gameloop
    setTimeout(gameloop(room), 100);
}

//private async
function gameloop(room){
    //do a tick
    console.log("tick!");

    if(room.user1 != undefined){
        room.user1.calcNewPosition();
    }

    if(room.user2 != undefined){
        room.user2.calcNewPosition();
    }
         
    setTimeout(gameloop(room), 100);
}

module.exports = {
    start,
}