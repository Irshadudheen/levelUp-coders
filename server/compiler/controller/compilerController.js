const path = require('path');
const fs = require('fs').promises;
const k8s = require('@kubernetes/client-node');

const USER_CODE_DIR = '../user_code';

// const kc = new k8s.KubeConfig();
// kc.loadFromCluster();
// const exec = new k8s.Exec(kc);

const runCode = async (req, res) => {
  const { filename, content, language } = req.body;
  console.log('Received request:', { filename, content, language });
  
  if (!filename || !content || !language) {
    return res.status(400).send('Filename, content, and language are required.');
  }

  try {
    // Ensure the USER_CODE_DIR exists
    await fs.mkdir(USER_CODE_DIR, { recursive: true });
    console.log(`Ensured directory exists: ${USER_CODE_DIR}`);

    const filePath = path.join(USER_CODE_DIR, filename);
    console.log('Writing file to:', filePath);
    
    // Write the code to a file
    await fs.writeFile(filePath, content);
    console.log('File written successfully');

    // Set up server-sent events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    
    // Execute the code in the sandbox container
    const command = ['/app/run_code.sh', language, path.join(USER_CODE_DIR, filename)];
    const podName = process.env.HOSTNAME;
    const namespace = process.env.NAMESPACE || 'compiler-namespace';

    console.log('Executing command:', command);
    console.log('Pod name:', podName);
    console.log('Namespace:', namespace);

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
      console.log('Received data:', data);
      res.write(`data: ${JSON.stringify({ log: data })}\n\n`);
    });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    });

    stream.on('close', () => {
      console.log('Execution completed');
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
    const filePath = path.join(USER_CODE_DIR, filename);
    fs.unlink(filePath).catch(console.error);
  }
}

module.exports = { runCode };