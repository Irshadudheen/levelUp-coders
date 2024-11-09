const path = require('path')
const fs = require('fs')
const {spawn} = require('child_process')
const cleanup = require('./cleanup')
function runCode(language, code) {
    return new Promise((resolve, reject) => {
  
      const tempFile = path.join(__dirname, `temp.${language}`);
      fs.writeFileSync(tempFile, code);
  
  
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
        console.log('eorror occure', errorData)
      });
      if (errorData) {
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
  
          console.log('error', errorData)
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
  module.exports=runCode