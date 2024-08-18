import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';

const CompilerUI = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('Output will be displayed here.');

  const handleCompile = () => {
    setOutput('Compiling code...');
    // Logic for compiling the code
    console.log('Compiling code...');
  };

  const handleRun = () => {
    setOutput('Running code...');
    // Logic for running the code
    console.log('Running code...');
  };

  const handleClear = () => {
    setCode('// Write your code here');
    setOutput('Output cleared.');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setOutput('Code copied to clipboard.');
  };

  return (
    <>
      <UserHeader />
      <div className="flex mt-14 flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-700">
            <ControlledEditor
              value={code}
              onBeforeChange={(editor, data, value) => setCode(value)}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
              }}
              className="bg-gray-900 rounded-lg"
            />
          </div>
          <div className="flex justify-between p-4 space-x-4">
            <div>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
            <div className="space-x-4">
              <Button
                variant="contained"
                color="warning"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
              >
                Copy
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CodeIcon />}
                onClick={handleCompile}
              >
                Compile
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<PlayArrowIcon />}
                onClick={handleRun}
              >
                Run
              </Button>
            </div>
          </div>
          <div className="p-4 bg-gray-700 rounded-b-lg">
            <div className="text-white">{output}</div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default CompilerUI;