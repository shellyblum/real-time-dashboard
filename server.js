const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;

let initUsersData = fs.readFileSync('models/users.json'); 
let initUsers = JSON.parse(initUsersData);  
let users = [];
// let connectedSockets = [];

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket) {
  console.log('new connection made: ' + socket.nickname + socket.id);
  // connectedSockets.push(socket.id);
  // console.log(connectedSockets);
  // for(var i = 0; i < socket_list.length; i++) { 
  //   console.log(socket_list[i].id); 
  // }

  socket.on('get-initUsers', function(data) {
    socket.emit('all-initUsers', initUsers);
  })
  socket.on('get-users', function(data) {
    socket.emit('all-users', users);
  });

  // When new socket joins
  socket.on('join', function(data) {
    socket.nickname = data.nickname;
    users[socket.nickname] = socket; 
    var userObj = {
      nickname: data.nickname,
      socketid: socket.id,
      ip: data.ip,
      type: data.type,
      os: data.os,
      localTime: data.localTime,
      timeZone: data.timeZone,
      online: data.online
    }
    // connectedSockets.push(socket.id);
    users.push(userObj);
    io.emit('all-users', users);
  });


    socket.on('disconnect', function () {
    console.log(socket.id +  socket.nickname + ': disconnected');

  // for(var i = 0; i < connectedSockets.length; i++) { 
  //   console.log(connectedSockets[i]); 
  // }
      function checkStatus() {
        if(socket.nickname) {

          socket.emit('turn-red', socket.nickname);
        }
      }

      // let offlineUsers = users.filter(function(item) {
      //   return item.socketid === socket.id;
      // });
      // users = users.filter(function(item) {
      //   return item.nickname !== socket.nickname;
      // })
      //set time out before sending 'turn-red'
      // socket.emit('turn-red', offlineUsers);
      // console.log(offlineUsers);
      // io.emit('all-users', users);
    });
    
  

});

server.listen(port, function() {
  console.log("Listening on port " + port);
});