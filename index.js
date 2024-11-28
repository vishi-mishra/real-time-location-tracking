const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('public'));

let devices = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
socket.on('device-location', (location) => {
    console.log(`Received location from ${socket.id}:`, location);

    devices[socket.id] = location;

    io.emit('new-location', { id: socket.id, location });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete devices[socket.id];
  });
});

server.listen(3000);
