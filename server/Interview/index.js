const express = require('express');
const { exec } = require('child_process');
const http = require('http');
const { Server } = require('socket.io');
const NodeCache = require('node-cache');
const { v4  }= require('uuid');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const cors = require('cors')
const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/validateRoom/:roomId',(req,res)=>{
  try {
    const {roomId}=req.params;
    const checkRoom = cache.get(`room:${roomId}`)
    console.log(checkRoom)
    if(checkRoom){
      res.json({success:true})
    }else{
      res.json({success:false})
    }
    
  } catch (error) {
    
  }
})
app.post('/runCode',(req,res)=>{
  try {
    let {code}=req.body;
    console.log(code)
    code = code.replace(/"/g, '\\"').replace(/\n/g, ' ');
    exec(`node -e "${code}"`, (error, stdout, stderr) => {
      if (error) {
        res.status(500).json({ error: stderr });
        return;
      }
      res.status(200).json({ output: stdout });
    });
  } catch (error) {
    
  }
})
 app.post('/createRoom',(req,res)=>{
roomId =v4()
  cache.set(`room:${roomId}`,`console.log('welcome to interview')`)
  res.json({roomId})
 })
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
