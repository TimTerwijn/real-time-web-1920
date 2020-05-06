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
    // else if (e.keyCode == '32') {// space
    //   app.onSpace();
    // }
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