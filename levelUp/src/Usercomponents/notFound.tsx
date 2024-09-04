import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from "/404_face.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white text-gray-900 text-center">
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src={image} alt="404 Face" className="max-w-xs md:max-w-md" />
      </div>
      <div className="md:w-1/2 bg-gray-100 p-10 rounded-lg shadow-lg md:text-left">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="mb-6 text-gray-600">Sorry, the page you're looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;