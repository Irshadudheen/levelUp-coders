import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import Split from "react-split";
import UserHeader from '../userHeader';
import UserFooter from '../userFooter';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import axios from 'axios';
import Timer from '../time';
import ProblemDescription from './problemDescription';
import Playground from './playground';

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
 
  <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
    {/* <Timer />  */}
     {/* Move the Timer component here, just inside the outer div */}
     <div className="w-full">

    <Split className="split" minSize={0}>
    <ProblemDescription />
   <Playground/>
    </Split >
     </div>
  </div>
 
</>
  );
};

export default CompilerUI;
