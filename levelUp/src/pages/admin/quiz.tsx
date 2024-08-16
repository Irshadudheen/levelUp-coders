import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import HeaderAdmin from '../../components/headerAdmin';

const Quiz: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
    
  };

  return (
    <>
    <HeaderAdmin/>
    <div className="max-w-md mx-auto p-6 text-black bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Quiz</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="quiz-title">
            Quiz Title
          </label>
          <input
            type="text"
            id="quiz-title"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter quiz title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="quiz-question">
            Question
          </label>
          <input
            type="text"
            id="quiz-question"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter question"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Answer Options
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option1"
              checked={selectedOption === 'option1'}
              onChange={() => handleOptionChange('option1')}
              className="mr-2"
              
            />
            <input
              type="text"
              id="option1-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 1"
             required
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option2"
              checked={selectedOption === 'option2'}
              onChange={() => handleOptionChange('option2')}
              className="mr-2"
        
            />
            <input
              type="text"
              id="option2-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 2"
              required
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option3"
              checked={selectedOption === 'option3'}
              onChange={() => handleOptionChange('option3')}
              className="mr-2"
        
            />
            <input
              type="text"
              id="option3-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 3"
              
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option4"
              checked={selectedOption === 'option4'}
              onChange={() => handleOptionChange('option4')}
              className="mr-2"
              
            />
            <input
              type="text"
              id="option4-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 4"
              
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
        >
          Add Quiz
        </button>
      </form>
    </div>
    </>
  );
};

export default Quiz;
