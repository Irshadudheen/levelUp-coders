import React from 'react';
import { FaPlus, FaTrashAlt, FaLink } from 'react-icons/fa';
import UserHeader from '../userHeader';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const InterviewHome = () => {
    const navigate =useNavigate()
  return (
    <>
    <UserHeader/>
    <div className="min-h-screen mt-10 bg-gray-100 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">levelUp Interview</h1>
        <div className="flex items-center gap-4">
          <div className="text-gray-600">
            Month's usage: <span className="font-bold">0/10</span> used
          </div>
        </div>
      </div>

      {/* Create Interview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div onClick={()=>navigate(`/room/${uuidv4()}`)} className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center">
          <button className="flex items-center gap-2 text-blue-600 text-lg">
            <FaPlus className="text-2xl" />
            Create an interview
          </button>
        </div>
      </div>

      {/* Past Interviews Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Interview Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Interview</h3>
          <p className="text-gray-500 text-sm mb-4">2024/09/22 12:47:38</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm gap-2">
              <span>1 question</span>
              <span>1m</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-red-600 hover:text-red-800">
                <FaTrashAlt />
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                <FaLink />
              </button>
            </div>
          </div>
        </div>

        {/* Interview Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Haring</h3>
          <p className="text-gray-500 text-sm mb-4">2024/07/18 20:32:50</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm gap-2">
              <span>1 question</span>
              <span>8m</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-red-600 hover:text-red-800">
                <FaTrashAlt />
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                <FaLink />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end">
        <button className="px-4 py-2 text-gray-500 hover:text-gray-800">&lt;</button>
        <span className="px-4 py-2 text-gray-700">1</span>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-800">&gt;</button>
      </div>
    </div>
    </>
  );
};

export default InterviewHome;
