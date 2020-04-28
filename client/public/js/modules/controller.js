import * as app from "../App.js";

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyDown(e) {
    e = e || window.event;

    if (e.keyCode == '37') {// left arrow
      app.onLeftKeyDown();
    }
    else if (e.keyCode == '39') {// right arrow
      app.onRightKeyDown();
    }
}

function keyUp(e) {
  e = e || window.event;

  if (e.keyCode == '37') {// left arrow
    app.onLeftKeyUp();
  }
  else if (e.keyCode == '39') {// right arrow
    app.onRightKeyUp();
  }
}