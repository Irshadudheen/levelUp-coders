const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`Joined room: ${roomId}`);

    const code = cache.get(roomId);
    if (code) {
      socket.emit('codeUpdate', code);
    }
  });

  socket.on('codeUpdate', ({ roomId, code }) => {
    cache.set(roomId, code);
    socket.to(roomId).emit('codeUpdate', code);
  });

  socket.on('leaveRoom', ({ roomId }) => {
    socket.leave(roomId);
    console.log(`Left room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4005, () => {
  console.log('Server running on port 4005');
});
