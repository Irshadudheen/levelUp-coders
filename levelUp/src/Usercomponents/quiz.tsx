import React, { useEffect, useState } from 'react';
import UserHeader from './userHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuiz } from '../Api/subject';
import Skeleton from 'react-loading-skeleton';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; answer: number }[]
  >([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let isMounted = true;

    const fetchQuiz = async () => {
      try {
        const res = await getQuiz(levelId as string);
        if (isMounted && res.length > 0) {
          const formattedQuestions = res.map((quiz) => {
            const options: string[] = Object.keys(quiz.options);
            const answer = options.findIndex((option) => quiz.options[option]);
            return {
              question: quiz.question,
              options: options.map(
                (option) => option.charAt(0).toUpperCase() + option.slice(1)
              ),
              answer: answer,
            };
          });

          if (isMounted) {
            setQuestions(formattedQuestions);
            setQuiz(res);
          }
        }
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();

    return () => {
      isMounted = false;
    };
  }, [levelId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleTimeout();
    }
  }, [timeLeft]);

  const handleTimeout = () => {
    if (selectedOption === null) {
      setSelectedOption(-1); // Consider as failed
    }
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30); // Reset timer for the next question
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);

    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30); // Reset timer for the next question
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30); // Reset timer for the first question
  };

  if (questions.length === 0) {
    return (
      <>
        <UserHeader />
        <div className="min-h-screen mt-5 bg-white flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-gray-100 rounded-lg shadow-lg p-6">
            <Skeleton className="max-w-lg w-full bg-gray-300 rounded-lg shadow-lg p-6" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <div className="min-h-screen mt-5 bg-white flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-100 rounded-lg shadow-lg p-6 relative">
          {showResult ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-black mb-4">Quiz Completed!</h2>
              <p className="text-gray-700">Your score: {score} / {questions.length}</p>
              {score !== questions.length ? (
                <button
                  onClick={handleRetry}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Retry
                </button>
              ) : (
                <button
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition"
                  onClick={() => navigate(`/compiler/${levelId}/two-sum`)}
                >
                  Next Compiler
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Timer at top center */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 text-black font-bold rounded-full px-6 py-2">
                {timeLeft} sec
              </div>
              <h2 className="text-xl font-semibold text-black mb-6 text-center">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                {questions[currentQuestion].question}
              </h3>
              <ul className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleOptionClick(index)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedOption === index
                          ? selectedOption === questions[currentQuestion].answer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-200 text-black hover:bg-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
