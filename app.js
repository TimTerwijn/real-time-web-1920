//set libaries
const express = require('express');
const app = express();
const path = require('path');

//set modules
const routes = require("./server/Routes.js")
const webSockets = require("./server/WebSockets.js");

//set public folder
app.use(express.static('client/public'));

//set views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/client/views'));

//set port listener 
const server = app.listen(process.env.PORT || 3000, function(){
    console.log(`Our app is running on port 3000!`);
});

//routes
routes.set(app);

//socketIO
const io = require('socket.io').listen(server);
webSockets.set(io)