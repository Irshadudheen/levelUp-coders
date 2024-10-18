import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import PrevefrenceNav from '../workSpace/prevefrenceNav';
import { validateRoom } from '../../Api/interview';

// Constants
const INITIAL_CODE = `console.log('welcome to interview')`;
const SERVER_URL = 'http://localhost:3000';

// Socket initialization
const socket = io('wss://molla.molla.cfd/socket.io/', {
  transports: ['websocket'],
  secure: true,
});

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [userCode, setUserCode] = useState<string>(INITIAL_CODE);
  const [output, setOutput] = useState<string>('Output');

  useEffect(() => {
    const checkRoom = async () => {
      const checkRoom = await validateRoom(roomId as string);
      if (!checkRoom.success) {
        navigate('/*');
      }
    };
    checkRoom();
  }, [roomId, navigate]);

  useEffect(() => {
    // Socket event handlers
    const handleCodeUpdate = (newCode: string) => setUserCode(newCode);
    const handleOutputUpdate = (newOutput: string) => {
      console.clear();
      console.log('Output update:', newOutput);
      setOutput(newOutput);
    };

    // Join room and set up listeners
    socket.emit('joinRoom', { roomId });
    socket.emit('requestCurrentCode', { roomId });
    socket.emit('requestCurrentOutput', { roomId });

    socket.on('codeUpdate', handleCodeUpdate);
    socket.on('outputUpdate', handleOutputUpdate);

    // Cleanup function
    return () => {
      socket.emit('leaveRoom', { roomId });
      socket.off('codeUpdate', handleCodeUpdate);
      socket.off('outputUpdate', handleOutputUpdate);
    };
  }, [roomId]);

  const executeCode = async (filename: string, content: string) => {
    try {
        setOutput('')
      const response = await fetch(`${SERVER_URL}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const events = decoder.decode(value).split('\n\n');
        for (const event of events) {
          if (event.startsWith('data: ')) {
            const data = JSON.parse(event.slice(6));
            console.log(data.log);  // Or update your UI with this data
            setOutput(prev => prev + (prev ? '\n' : '') + data.log);
          }
        }
      }
    } catch (error) {
      console.error('Error executing code:', error);
      toast.error('Something went wrong while executing the code');
    }
  };

  const runCode = async (language: string) => {
    executeCode('code.js', userCode);
    socket.emit('outputUpdate', { roomId, code: output });
  };

  const handleCodeChange = (value: string) => {
    setUserCode(value);
    socket.emit('codeUpdate', { roomId, code: value });
  };

  return (
    <div className='flex flex-col h-screen bg-dark-layer-1 relative'>
      <PrevefrenceNav runCode={runCode} />
      <div className="flex">
        <CodeMirrorEditor
          value={userCode}
          onChange={handleCodeChange}
          className="w-1/2"
        />
        <div className="w-px bg-gray-600" />
        <CodeMirrorEditor
          value={output}
          onChange={(e) => setOutput(e)}
          className="w-1/2"
        />
      </div>
    </div>
  );
};

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange, className }) => (
  <div className={`overflow-auto ${className}`}>
    <ReactCodeMirror
      value={value}
      theme={vscodeDark}
      onChange={onChange}
      extensions={[javascript()]}
      style={{ fontSize: 16 }}
    />
  </div>
);

export default Room;