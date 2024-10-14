const { Server } = require('socket.io');
const Client = require('socket.io-client');
const http = require('http');
const app = require('../src/app');

describe('Socket Controller - WebSocket Connections', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = http.createServer(app);
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
        done();
      });
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should connect via WebSocket and join a room', (done) => {
    clientSocket.emit('joinRoom', { roomId: 'testRoom' });
    
    serverSocket.on('joinRoom', ({ roomId }) => {
      expect(roomId).toBe('testRoom');
      done();
    });
  });

  it('should broadcast code updates', (done) => {
    const updatedCode = "console.log('Updated Code');";
    clientSocket.emit('codeUpdate', { roomId: 'testRoom', code: updatedCode });

    serverSocket.on('codeUpdate', ({ roomId, code }) => {
      expect(code).toBe(updatedCode);
      done();
    });
  });
});
