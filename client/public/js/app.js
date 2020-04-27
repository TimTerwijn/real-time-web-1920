import {checkKey} from "./modules/Controller.js";

const socket = io();
let room;

function init(){
    login();
}

//global room

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

socket.on("join-room", function(_roomName){
    
});

//private room

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



function onKeyLeft(){
    //move 
    const form = document.getElementById("form");
    let left = form.style.left;

    //remove letters and make a number
    let x = parseInt(left.replace(/\D/g,''));
    x = x - 1;

    left = x + "rem";
    console.log(left)
    form.style.left = left;
}

function onKeyRight(){
    //move 
    const form = document.getElementById("form");
    let left = form.style.left;
    
    //remove letters and make a number
    let x = parseInt(left.replace(/\D/g,''));
    x = x + 1;

    left = x + "rem";
    console.log(left)
    form.style.left = left;
}

export{
    onKeyLeft,
    onKeyRight,
}

init();