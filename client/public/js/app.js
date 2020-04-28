import * as controller from "./modules/Controller.js";

const socket = io();
let room;

function init(){
    login();
}


function login(){
    const id = localStorage.getItem('id');
    if(id == null){
        createAccount();
    }else{
        socket.emit('login', id);
    }
}

function createAccount(){
    const username = prompt("Please enter your name", "Harry Potter");
    socket.emit('register', username);
}

socket.on('store-userId', function(id){        
    localStorage.setItem('id', id);
});

socket.on('error-wrong-id', function(){        
    createAccount();
});

socket.on('client-message', function(data){
    const msg = data.message;
    const left = data.left;

    //show message
    const messages = document.getElementById("messages");
    const html = `
        <li>
            <div style="left:${left}" class="message">
               ${msg} 
            </div>
        </li>
    `;

    // messages.insertAdjacentHTML("beforeend", html);
});

socket.on('server-message', function(message){
    //show message
    const messages = document.getElementById("messages");
    const html = `
        <li>
            <div class="message">
               ${message} 
            </div>
        </li>
    `;

    // messages.insertAdjacentHTML("beforeend", html);
});

function onLeftKeyDown(){
    socket.emit('on-left-key-down');
}

function onLeftKeyUp(){
    socket.emit('on-left-key-up');
}

function onRightKeyDown(){
    socket.emit('on-right-key-down');
}

function onRightKeyUp(){
    socket.emit('on-right-key-up');
}

socket.on("emitPlayerX", function(playerCoordinates){
    const player1X = playerCoordinates.player1X;
    const player2X = playerCoordinates.player2X;

    setPlayer1X(player1X);
    setPlayer2X(player2X);
});

function setPlayer1X(x){
    const player1 = document.querySelector("section:nth-child(5)>img");

    const left = x + "px";
    player1.style.left = left;
}

function setPlayer2X(x){
    const player2 = document.querySelector("section:first-child>img");

    const left = x + "px";
    player2.style.left = left;
}

export{
    onLeftKeyDown,
    onLeftKeyUp,
    onRightKeyDown,
    onRightKeyUp,
}

init();