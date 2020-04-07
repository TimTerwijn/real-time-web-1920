import {checkKey} from "./modules/controller.js";

const socket = io();

function init(){
    login();
}

$(function () {
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading

        //get left 
        const form = document.getElementById("form");
        let left = form.style.left;

        const data = {
        "message" : $('#m').val(),
        "left" : left
        }

        socket.emit('client-message', data);
        $('#m').val('');
        return false;
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

        messages.insertAdjacentHTML("beforeend", html);
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

        messages.insertAdjacentHTML("beforeend", html);
    });

    socket.on('store-id', function(id){        
        localStorage.setItem('id', id);
    });    
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

export function onKeyLeft(){
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

export function onKeyRight(){
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

init();