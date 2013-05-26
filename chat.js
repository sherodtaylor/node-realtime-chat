var express = require('express')()
  , server = require('http').createServer(express)
  , io = require('socket.io').listen(server)
  , clients = [];

server.listen(1234);

express.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('join', function(nick){
    if ( clients.indexOf(nick) < 0 ){
      console.log(nick);
      console.log(clients);
      socket.nick = nick;
      clients.push(nick);
      console.log(clients);
      socket.broadcast.emit('user-joined', nick);
    }
  });

  socket.on('chat', function(message){
    console.log(message);
    io.sockets.emit("chat-update", socket.nick,  message);
  });
});

