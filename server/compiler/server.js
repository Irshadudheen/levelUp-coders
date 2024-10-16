const express = require('express');
const Docker = require('dockerode');
const path = require('path');
const fs = require('fs');

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
      });
  
      await container.start();
  
      const logStream = await container.logs({
        stdout: true,
        stderr: true,
        follow: true,
      });

      let logOutput = '';
      await new Promise((resolve, reject) => {
        logStream.on('data', (chunk) => {
          logOutput += chunk.toString('utf8');
        });
        logStream.on('end', resolve);
        logStream.on('error', reject);
      });

      console.log('Container logs:', logOutput);
      res.send(logOutput);
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