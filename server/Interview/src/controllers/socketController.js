const NodeCache = require('node-cache');
const cache = new NodeCache({  });
function handleSocketConnection(io, socket) {
  console.log('User connected');

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`Joined room: ${roomId}`);

    // Send the current code and output from the cache
    const outPutCode = cache.get(`output:${roomId}`);
    const code = cache.get(roomId);

    if (code) {
      socket.emit('codeUpdate', code);  // Send code to the newly joined user
    }

    if (outPutCode) {
      socket.emit('outputUpdate', outPutCode);  // Send the current output to the newly joined user
    }
  });

  // When output changes, broadcast it to other users and cache it
  socket.on('outputUpdate', ({ roomId, code }) => {
    cache.set(`output:${roomId}`, code);  // Cache the updated output
    socket.to(roomId).emit('outputUpdate', code);  // Broadcast output to other users in the room
  });

  // When code changes, broadcast it to other users and cache it
  socket.on('codeUpdate', ({ roomId, code }) => {
    cache.set(roomId, code);  // Cache the updated code
    socket.to(roomId).emit('codeUpdate', code);  // Broadcast code to other users in the room
  });

  socket.on('leaveRoom', ({ roomId }) => {
    socket.leave(roomId);
    console.log(`Left room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
}

module.exports = { handleSocketConnection };