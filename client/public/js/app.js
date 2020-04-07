import {checkKey} from "./modules/controller.js";

const socket = io();

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

        socket.emit('new-data', data);
        $('#m').val('');
        return false;
    });
    socket.on('new-data', function(data){
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
});

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