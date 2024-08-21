import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';

import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import axios from 'axios';

const CompilerUI: React.FC = () => {
  const defaultCode: string = `/**
   * @param {number[]} nums
   * @return {number}
   */
  var thirdMax = function(nums) {
      // Your code here
  };`;

  const [code, setCode] = useState<string>(defaultCode);
  const [output, setOutput] = useState<string>('Output will be displayed here.');

  const handleCompile = (): void => {
    setOutput('Compiling code...');
    // Logic for compiling the code
    console.log('Compiling code...');
  };

  const handleRun = async (): Promise<void> => {
    try {
      setOutput('Running code...');
      const res = await axios.post<{ output: string }>('http://localhost:4001/compiler/compile', { code, language: 'javascript' });
      setOutput(res.data.output);
      console.log('Running code...');
    } catch (error: any) {
      console.error(error.message);
      setOutput('Error: ' + error.message);
    }
  };

  const handleClear = (): void => {
    setCode(defaultCode);
    setOutput('Output cleared.');
  };

  const handleCopy = (): void => {
    navigator.clipboard.writeText(code);
    setOutput('Code copied to clipboard.');
  };
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };
  return (
    <>
      <UserHeader />
      <div className="flex mt-14 flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-700 bg-gray-800 rounded-lg">
  <textarea 
    value={code}
    onChange={handleCodeChange}
    className="w-full p-4 border text-white bg-gray-900 border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
    rows={10} // Adjust the number of rows as needed
    placeholder="Write your code here..."
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
