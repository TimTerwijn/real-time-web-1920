import {checkKey} from "./modules/Controller.js";

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



function onKeyLeft(){
    //get my player
    const me = document.querySelector("section:nth-child(5)>img");
    
    //move 
    let left = me.style.left;
    
    //remove letters and make a number
    let x = parseInt(left.replace(/\D/g,''));
    x = x - 5;

    left = x + "px";
    me.style.left = left;
}

function onKeyRight(){
    //get my player
    const me = document.querySelector("section:nth-child(5)>img");
    
    //move 
    let left = me.style.left;
    
    //remove letters and make a number
    let x = parseInt(left.replace(/\D/g,''));
    x = x + 5;

    left = x + "px";
    me.style.left = left;
}

export{
    onKeyLeft,
    onKeyRight,
}

init();