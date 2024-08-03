import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"]
    }
  ];

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-md p-4 border-2 border-blue-500">
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-2">{questions[currentQuestion].question}</h1>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`w-full p-2 border rounded ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="bg-purple-200 text-black py-2 px-4 rounded-full shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
