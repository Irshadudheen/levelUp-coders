const express = require('express');
const config = require('./config/dotenvConfig')
const { json, urlencoded } = express;
const http = require('http');
const { Server } = require('socket.io');
const { handleSocketConnection } = require('./controllers/socketController')


const cors = require('cors')
const app = express();
const { errorhandler } = require('./middleware/errorhandler');
const routes = require('./routes');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/interview', routes);
io.on('connection', (socket) => {
  handleSocketConnection(io, socket);
});

// Global error handler middleware
app.use(errorhandler);

const PORT = process.env.NODE_ENV === 'test' ? 4006 : config.app.port;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
