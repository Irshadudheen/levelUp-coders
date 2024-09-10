import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
  const navigate = useNavigate()
    return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-4">Oops! Something went wrong with your payment. Please try again.</p>
        <a onClick={()=>navigate('/')} className="text-blue-500 hover:underline">Return to Home</a>
      </div>
    </div>
  );
};

export default FailurePage;
