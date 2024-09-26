const express = require('express');
const { spawn ,exec } = require('child_process');
const http = require('http');
const { Server } = require('socket.io');
const NodeCache = require('node-cache');
const { v4  }= require('uuid');
const cache = new NodeCache({  });
const cors = require('cors')
const app = express();
const {createClient} = require("redis"); 
const fs = require('fs');

const path = require('path');
const client = createClient();
(async () => { 
    await client.connect(); 
})(); 
  
console.log("Connecting to the Redis"); 

client.on('error', err => console.log('Redis Client Error', err));


const a = async()=>{

  await client.set('key', 'irshad');
  const value = await client.get('key');
  console.log(value);
}
a()

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  app.use(cors())
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
function runCode(language, code) {
  return new Promise((resolve, reject) => {
    // Step 1: Write the code to a temporary file
    const tempFile = path.join(__dirname, `temp.${language}`);
    fs.writeFileSync(tempFile, code);

    // Step 2: Run the appropriate command based on the language
    let command;
    let args = [];

    switch (language) {
      case 'js':
        command = 'node';
        args.push(tempFile);
        break;
      case 'py':
        command = 'python';
        args.push(tempFile);
        break;
      case 'java':
        const className = path.basename(tempFile, '.java');
        command = 'javac';
        args.push(tempFile);
        break;
      case 'cpp':
        const output = path.join(__dirname, 'a.out');
        command = 'g++';
        args.push(tempFile, '-o', output);
        break;
      default:
        reject('Unsupported language');
        return;
    }

    // Step 3: Spawn a child process to run the code
    const child = spawn(command, args);

    let outputData = '';
    let errorData = '';

    child.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    child.on('exit', (code) => {
      if (code === 0 && language === 'cpp') {
        // If C++ was compiled, run the output executable
        const runExecutable = spawn('./a.out');
        runExecutable.stdout.on('data', (data) => {
          outputData += data.toString();
        });
        runExecutable.stderr.on('data', (data) => {
          errorData += data.toString();
        });

        runExecutable.on('exit', (exitCode) => {
          cleanup(tempFile, './a.out');
          if (exitCode === 0) {
            resolve(outputData);
          } else {
            reject(errorData || `Process exited with error code: ${exitCode}`);
          }
        });
      } else if (code !== 0) {
        cleanup(tempFile);
        reject(errorData || `Process exited with error code: ${code}`);
      } else {
        cleanup(tempFile);
        resolve(outputData);
      }
    });
  });
}

function cleanup(...files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }
}
app.post('/runCode',async (req, res) => {
  try {
    let { code } = req.body;
   const output=await runCode('js',code)
   console.log(output,'the output')
        res.status(200).json({ output });
    
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
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
