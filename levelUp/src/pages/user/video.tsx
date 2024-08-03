import React from 'react';

const VideoPlayer:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative bg-gray-300 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-md border-2 border-blue-500 p-4">
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.083-3.681A1 1 0 007 8.305v7.39a1 1 0 001.669.821l6.083-3.682a1 1 0 000-1.693z"/>
          </svg>
        </div>
        <div className="flex items-center justify-center mt-2">
          <button className="bg-gray-500 text-white rounded-full p-2 mx-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m-7 3h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </button>
          <button className="bg-gray-500 text-white rounded-full p-2 mx-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.083-3.681A1 1 0 007 8.305v7.39a1 1 0 001.669.821l6.083-3.682a1 1 0 000-1.693z"/>
            </svg>
          </button>
          <button className="bg-gray-500 text-white rounded-full p-2 mx-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.083-3.681A1 1 0 007 8.305v7.39a1 1 0 001.669.821l6.083-3.682a1 1 0 000-1.693z"/>
            </svg>
          </button>
          <button className="bg-gray-500 text-white rounded-full p-2 mx-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m-7 3h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </div>
      <button className="mt-4 bg-purple-200 text-black py-2 px-4 rounded-full shadow-md">
        Skip
      </button>
    </div>
  );
};

export default VideoPlayer;
