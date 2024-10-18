const express = require('express');
const Docker = require('dockerode');
const path = require('path');
const fs = require('fs');
const stream = require('stream');

const app = express();
const docker = new Docker();

const PORT = 3000;

app.use(express.json());

app.post('/execute', async (req, res) => {
    const { filename, content } = req.body;
  
    if (!filename || !content) {
      return res.status(400).send('Filename and content are required.');
    }
  
    const filePath = path.join(__dirname, 'user_code', filename);
    fs.writeFileSync(filePath, content);
  
    let container;
    try {
      container = await docker.createContainer({
        Image: 'my_compiler_image',
        Cmd: ['/app/run_code.sh', `/user_code/${filename}`],
        HostConfig: {
          Binds: [`${__dirname}/user_code:/user_code`],
        },
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
      });
  
      await container.start();

      // Set up server-sent events
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });

      const logStream = new stream.PassThrough();
      container.attach({stream: true, stdout: true, stderr: true}, (err, stream) => {
        if (err) return console.error(err);
        container.modem.demuxStream(stream, logStream, logStream);
      });

      logStream.on('data', (chunk) => {
        const logData = chunk.toString('utf8').trim();
        if (logData) {
          res.write(`data: ${JSON.stringify({ log: logData })}\n\n`);
        }
      });

      await new Promise((resolve) => {
        container.wait((err, data) => {
          if (err) console.error('Container wait error:', err);
          resolve();
        });
      });

      res.write(`data: ${JSON.stringify({ log: 'Execution completed' })}\n\n`);
      res.end();

    } catch (err) {
      console.error('Error running container:', err);
      if (!res.headersSent) {
        res.status(500).send('Failed to execute code.');
      }
    } finally {
      if (container) {
        try {
          await container.stop().catch(err => {
            if (err.statusCode === 304) {
              console.log('Container was already stopped');
            } else {
              throw err;
            }
          });
          await container.remove();
        } catch (removeErr) {
          console.error('Error removing container:', removeErr);
        }
      }
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
