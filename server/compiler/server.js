const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const k8s = require('@kubernetes/client-node');

const app = express();
app.use(express.json());

const USER_CODE_DIR = '/user_code';

// Initialize Kubernetes client
const kc = new k8s.KubeConfig();
kc.loadFromCluster();
const exec = new k8s.Exec(kc);

app.post('/execute', async (req, res) => {
    const { filename, content, language } = req.body;

    if (!filename || !content || !language) {
      return res.status(400).send('Filename, content, and language are required.');
    }

    const filePath = path.join(USER_CODE_DIR, filename);
    
    try {
      // Write the code to a file
      await fs.writeFile(filePath, content);

      // Set up server-sent events
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });

      // Execute the code in the sandbox container
      const command = ['/app/run_code.sh', language, filename];
      const podName = process.env.HOSTNAME; // Kubernetes sets this to the pod name
      const namespace = 'default'; // Adjust if you're using a different namespace

      const stream = await exec.exec(
        namespace,
        podName,
        'sandbox', // container name
        command,
        process.stdout,
        process.stderr,
        process.stdin,
        true // tty
      );

      stream.on('data', (buffer) => {
        const data = buffer.toString();
        res.write(`data: ${JSON.stringify({ log: data })}\n\n`);
      });

      stream.on('error', (err) => {
        console.error('Stream error:', err);
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      });

      stream.on('close', () => {
        res.write(`data: ${JSON.stringify({ log: '//Execution completed' })}\n\n`);
        res.end();
      });

    } catch (err) {
      console.error('Error executing code:', err);
      if (!res.headersSent) {
        res.status(500).send('Failed to execute code.');
      } else {
        res.write(`data: ${JSON.stringify({ error: 'Failed to execute code.' })}\n\n`);
        res.end();
      }
    } finally {
      // Clean up: delete the file after execution
      fs.unlink(filePath).catch(console.error);
    }
});

app.listen(3000, () => {
  console.log('Main service listening on port 3000');
});