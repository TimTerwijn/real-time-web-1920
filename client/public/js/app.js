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
    // socket.emit('on-key-left');
}

function onLeftKeyUp(){
    // socket.emit('on-key-left');
}

function onRightKeyDown(){
    // socket.emit('on-right-key-up');
}

function onRightKeyUp(){
    // socket.emit('on-key-right');
}

export{
    onLeftKeyDown,
    onLeftKeyUp,
    onRightKeyDown,
    onRightKeyUp,
}

init();