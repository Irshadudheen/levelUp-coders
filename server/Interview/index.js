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
      console.log('eorror occure',errorData)
    });
    if(errorData){
      resolve(errorData);
    }

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

        console.log('error',errorData)
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
const data=async()=>{

  const output=await runCode('py',`print("Try programiz.pro")`)
  console.log(output,'the response ')
}
data()
app.post('/runCode',async (req, res) => {
  try {
    let { code,language } = req.body;
   const output=await runCode(language,code)
   console.log(output,'the output')
        res.status(200).json({ output });
    
    
  } catch (error) {
    console.log(error,'the error')
    res.status(200).json({ error:error });
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
});

server.listen(4005, () => {
  console.log('Server running on port 4005');
});
// const { PythonShell } = require('python-shell');

// function runPythonCode(code) {
//   return new Promise((resolve, reject) => {
//     PythonShell.runString(code, null, (err, results) => {
//       if (err) reject(err);
//       resolve(results);
//     });
//   });
// }

// (async () => {
//   try {
//     console.log('dksj')
//     const result = await runPythonCode(`
// x = 1 + 1
// print(x)
//     `);
//     console.log('hasd',typeof result)
//     console.log('Python output:', result);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// })();