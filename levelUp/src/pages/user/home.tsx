import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [home, setHome] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCourses([
        { id: 1, title: 'Learn JavaScript for Free!', description: 'Learn JavaScript for free with our interactive lessons and quizzes.', imgSrc: 'path/to/js-logo.png' },
        { id: 2, title: 'Learn React.js for Free!', description: 'Learn React.js for free with our interactive lessons and quizzes.', imgSrc: 'path/to/react-logo.png' },
        { id: 3, title: 'Learn Node.js for Free!', description: 'Learn Node.js for free with our interactive lessons and quizzes.', imgSrc: 'path/to/node-logo.png' },
      ]);
    }, 1000);

    setTimeout(() => setHome('Home Page'), 1000);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          {home || <Skeleton width={200} baseColor="#1F2937" highlightColor="#374151" />}
        </h1>
        <div className="space-y-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="bg-customBlue rounded-xl shadow-lg overflow-hidden">
                <img src={course.imgSrc} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Let's Start!
                  </button>
                </div>
              </div>
            ))
          ) : (
            Array(3).fill().map((_, index) => (
              <div key={index} className="bg-customBlue rounded-xl shadow-lg overflow-hidden">
                <Skeleton height={192} baseColor="#1F2937" highlightColor="#374151" />
                <div className="p-4">
                  <Skeleton count={2} baseColor="#1F2937" highlightColor="#374151" />
                  <Skeleton width={100} baseColor="#1F2937" highlightColor="#374151" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
