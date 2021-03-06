import * as controller from "./modules/Controller.js";
import * as render from "./modules/Render.js";

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

let playerType = "player1";
socket.on('set-player', function(_playerType){        
    
    const main = document.querySelector("main");

    //rotate screen
    if(_playerType == "player2"){
        playerType = "player2";
        main.style.transform = "rotate(180deg)";
    }

    //render screen
    main.classList.toggle("hidden");
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
    if(playerType == "player1"){
        socket.emit('on-left-key-down');
    }else{
        socket.emit('on-right-key-down');
    }
}

function onLeftKeyUp(){
    if(playerType == "player1"){
        socket.emit('on-left-key-up');
    }else{
        socket.emit('on-right-key-up');
    }
}

function onRightKeyDown(){
    if(playerType == "player1"){
        socket.emit('on-right-key-down');
    }else{
        socket.emit('on-left-key-down');
    }
}

function onRightKeyUp(){
    if(playerType == "player1"){
        socket.emit('on-right-key-up');
    }else{
        socket.emit('on-left-key-up');
    }
}

// function onSpace(){
//     socket.emit('on-space');
// }

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

socket.on("store-starships", function(starships){
    render.starshipSelection(starships);
});

//make function public
window.emitSprite = emitSprite;
function emitSprite(sprite){
    socket.emit('set-sprite', sprite);
}

socket.on("set-player1-sprite", function(sprite){
    const player1 = document.querySelector("section:nth-child(5)>img");
    player1.src=sprite;
});

socket.on("set-player2-sprite", function(sprite){
    const player2 = document.querySelector("section:first-child>img");
    player2.src=sprite;
});



export{
    onLeftKeyDown,
    onLeftKeyUp,
    onRightKeyDown,
    onRightKeyUp,
    // onSpace,
}

init();