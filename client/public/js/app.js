import {checkKey} from "./modules/Controller.js";

const socket = io();

function init(){
    login();
}

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

socket.on('store-id', function(id){        
    localStorage.setItem('id', id);
});    

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
    socket.emit('create-account', username);
}

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