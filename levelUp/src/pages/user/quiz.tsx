import React, { useState } from 'react';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: 0,
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: 1,
    },
    // Add more questions as needed
  ];

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      // Handle correct answer logic here
    }
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            <p className="text-gray-600">Your score: {/* Score calculation here */}</p>
            <button
              onClick={handleRetry}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {questions[currentQuestion].question}
            </h3>
            <ul className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleOptionClick(index)}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                      selectedOption === index
                        ? selectedOption === questions[currentQuestion].answer
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleNextQuestion}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
              disabled={selectedOption === null}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
