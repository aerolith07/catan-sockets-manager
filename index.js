const express = require('express')
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4545

const app = express()
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id.substr(0, 6));

  // When update recieved from one client, emit an update to all other clients
  socket.on("apiUpdateLocal", (data) => {
    console.log(`local update [${data}] recieved, sending to everyone else`)
    socket.broadcast.emit('apiUpdate')
  });

  socket.on("updateTimerLocal", (data) => {
    console.log('update timer', data)
    socket.broadcast.emit('updateTimer', data)
  });

  socket.on("disconnect", () => {
    console.log('Disconnected', socket.id.substr(0, 6))
  });
});

server.listen(port, () => console.log(`listening for sockets on port ${port}`))