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

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);

    // Update score if the selected option is correct
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Automatically move to the next question after a brief delay
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
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
  };

  if (questions.length === 0) {
    return (
      <>
        <UserHeader />
        <div className="min-h-screen mt-5 bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <Skeleton className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <div className="min-h-screen mt-5 bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
          {showResult ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
              <p className="text-gray-600">Your score: {score} / {questions.length}</p>
              {score !== questions.length ? (
                <button
                  onClick={handleRetry}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  Retry
                </button>
              ) : (
                <button
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                  onClick={() => navigate(`/compiler/${levelId}`)}
                >
                  Next Compiler
                </button>
              )}
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
                      disabled={selectedOption !== null}  // Disable buttons if an option is selected
                      className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                        selectedOption === index
                          ? selectedOption === questions[currentQuestion].answer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
