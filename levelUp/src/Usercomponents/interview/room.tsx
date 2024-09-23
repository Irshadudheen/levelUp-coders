import React, { useState } from 'react';
import { FaVideo, FaMicrophoneSlash, FaPhoneSlash, FaComments, FaUsers, FaCode } from 'react-icons/fa';
import  CodeMirror  from '@uiw/react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css'; // Choose a theme

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false); // For toggling the compiler
  const [code, setCode] = useState("// Write your code here..."); // State for code input

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, messageInput]);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Video Section */}
        <div className="flex-1 bg-black rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-72 sm:h-96 bg-gray-800 flex items-center justify-center">
            {/* Placeholder for video feed */}
            <div className="text-white text-lg">Video Stream</div>
          </div>

          {/* Controls Section */}
          <div className="flex justify-center mt-4 gap-4">
            {/* Start/Stop Video Button */}
            <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
              <FaVideo className="text-xl" />
            </button>

            {/* Mute/Unmute Button */}
            <button className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700">
              <FaMicrophoneSlash className="text-xl" />
            </button>

            {/* End Call Button */}
            <button className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700">
              <FaPhoneSlash className="text-xl" />
            </button>

            {/* Show Participants Button */}
            <button
              className={`bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 ${showParticipants && 'bg-green-800'}`}
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <FaUsers className="text-xl" />
            </button>

            {/* Show Chat Button */}
            <button
              className={`bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 ${showChat && 'bg-blue-800'}`}
              onClick={() => setShowChat(!showChat)}
            >
              <FaComments className="text-xl" />
            </button>

            {/* Show Compiler Button */}
            <button
              className={`bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 ${showCompiler && 'bg-purple-800'}`}
              onClick={() => setShowCompiler(!showCompiler)}
            >
              <FaCode className="text-xl" />
            </button>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="lg:w-80 flex flex-col gap-6">
          {/* Participants Section */}
          {showParticipants && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Participants</h3>
              <div className="flex flex-col gap-4">
                {/* User Cards */}
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4 shadow">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">U1</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">User 1</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4 shadow">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">U2</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">User 2</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4 shadow">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">U3</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">User 3</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Section */}
          {showChat && (
            <div className="bg-white rounded-lg shadow-lg flex flex-col h-80 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat</h3>
              <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div key={index} className="bg-gray-200 text-black p-2 rounded-lg shadow">
                      {msg}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No messages yet</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 text-black p-2 border focus:outline-none rounded-lg"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  className="bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Compiler Section */}
          {showCompiler && (
            <div className="bg-white rounded-lg shadow-lg flex flex-col h-80 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Compiler</h3>
              <CodeMirror
                value={code}
                options={{
                  mode: 'javascript',
                  theme: 'dracula', // Pick a theme
                  lineNumbers: true,
                  tabSize: 2,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode(value);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
