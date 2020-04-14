import * as app from "../App.js";

document.onkeydown = checkKey;
export function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {// left arrow
      app.onKeyLeft();
    }
    else if (e.keyCode == '39') {// right arrow
      app.onKeyRight();
    }
}