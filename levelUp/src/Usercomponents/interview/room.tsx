import React, { useEffect, useState } from 'react'
import PrevefrenceNav from '../workSpace/prevefrenceNav'
import Split from 'split.js'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'
const socket = io('http://localhost:4005');

const Room = () => {
    const { roomId } = useParams();
// Inside your room creation logic:
const [userCode, setUserCode] = useState(``);
const [inviteLink, setInviteLink] = useState('');
useEffect(() => {
    // Join the room
    socket.emit('joinRoom', { roomId });

    // Request the current code from the server or other users
    socket.emit('requestCurrentCode', { roomId });

    // Listen for code updates from the server or other users
    socket.on('codeUpdate', (newCode) => {
        setUserCode(newCode);
    });

    return () => {
        // Leave the room when the component unmounts
        socket.emit('leaveRoom', { roomId });
    };
}, [roomId]);
  const handleCodeChange = (value: string) => {
    setUserCode(value);
    
    // Broadcast the updated code to the server, which will send it to other users
    socket.emit('codeUpdate', { roomId, code: value });
};
  return (
    <div className='flex flex-col h-screen bg-dark-layer-1 relative '>
         <PrevefrenceNav />
         
                <div className="w-full overflow-auto">
                    <ReactCodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={handleCodeChange}
                        onPaste={() => toast.error("Don't cheat!")}
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
                    />
                </div>
    </div>

  )
}

export default Room