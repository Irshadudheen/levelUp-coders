import React, { useEffect, useState } from 'react';
import PrevefrenceNav from '../workSpace/prevefrenceNav';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { sendCode, validateRoom } from '../../Api/interview';
import Api from '../../service/axios';
import { toast } from 'react-toastify';


const socket = io('http://localhost:4005');

const Room = () => {
    const { roomId } = useParams();
    const [userCode, setUserCode] = useState(`console.log('welcome to interview')`);
    const [outPut,setOutPut]=useState('outPut')
    // const [language,setLanguage]=useState('py')
    const navigate = useNavigate();
    const runCode=async(language:string)=>{
        console.log(userCode)
        const res = await sendCode(userCode,language)
        console.log(res)
        if(res.output){
            setOutPut(res.output)
            socket.emit('outputUpdate', { roomId, code: res.output });
        }else{
            setOutPut(res.error)
            toast.error('something went wrong')
            socket.emit('outputUpdate', { roomId, code: res.output });

        }
    }
    useEffect(() => {
        const checkRoom = async () => {
            const checkRoom = await validateRoom(roomId as string);
            if (!checkRoom.success) {
                navigate('/*');
            }
        };
        checkRoom();
    }, []);

    useEffect(() => {
        // Join the room
        socket.emit('joinRoom', { roomId });

        // Request the current code from the server or other users
        socket.emit('requestCurrentCode', { roomId });
        socket.emit('requestCurrentOutput',{roomId})
        socket.on('outputUpdate',(newOutput)=>{
            console.clear()
            console.log('ahdahahahah',newOutput)
            setOutPut(newOutput)
        })
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
      
        // Update the userCode with the processed newCode
        setUserCode(value);
    
        // Broadcast the updated code to the server, which will send it to other users
        socket.emit('codeUpdate', { roomId, code: value });
    };

    return (
        <div className='flex flex-col h-screen bg-dark-layer-1 relative '>
            <PrevefrenceNav runCode={runCode} />
            <div className="flex">
                <div className="w-1/2 overflow-auto  ">
                    <ReactCodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={handleCodeChange}
                      
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
                    />
                </div>
                <div className="w-1/2 overflow-auto">
                    <ReactCodeMirror
                        value={outPut}
                        theme={vscodeDark}
                        onChange={(e)=>setOutPut(e)}
                      
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Room;
