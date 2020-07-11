var robot = require('robotjs'); // <3 robotjs
var iohook = require('iohook'); //keyboard events
var { width, height } = require('screenz'); // screen resolution holen
var { movementX: dx, movementY: dy, endKey} = require('./config.json'); // die config extracten
setInterval(() => {
    var mousePos = robot.getMousePos();

    if(mousePos.x <= 0 || mousePos.x >= width-dx) dx=-dx;
    if(mousePos.y <= 0 || mousePos.y >= height-dy) dy=-dy;

    robot.moveMouse(mousePos.x+dx, mousePos.y+dy);
});

var cancelButtonTime = 0;
iohook.on('keyup', event => {
    if(endKey.ctrl && !event.ctrlKey) return;
    if(endKey.alt && !event.altKey) return;
    if(endKey.shift && !event.shiftKey) return;

    if(event.keycode == endKey.key) process.exit(0);
})
iohook.start();