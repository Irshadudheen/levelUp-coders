import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseDescription from './CourseDescription';
import { MovingBorderDemo } from './button';

const CourseGrid = ({ courses }: { courses: any[] }) => {
  const navigate = useNavigate();
  const [visibleCourses, setVisibleCourses] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const coursesPerPage = 8; // Display 8 courses per page (4 in each row)

  // Filter and paginate courses when the search term or course list changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(lowercasedSearchTerm) ||
      course.description.toLowerCase().includes(lowercasedSearchTerm)
    );

    setFilteredCourses(filtered);
    setCurrentIndex(0); // Reset pagination on search or course update
  }, [searchTerm, courses]);

  // Update the visible courses when the filtered courses or pagination changes
  useEffect(() => {
    const startIndex = currentIndex;
    const endIndex = startIndex + coursesPerPage;
    setVisibleCourses(filteredCourses.slice(startIndex, endIndex));
  }, [currentIndex, filteredCourses]);

  // Handle search suggestions with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = courses.filter(course =>
        course.name.toLowerCase().includes(lowercasedSearchTerm)
      );
      setSuggestions(filtered);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, courses]);

  const handleNextPage = () => {
    if (currentIndex + coursesPerPage < filteredCourses.length) {
      setCurrentIndex(currentIndex + coursesPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentIndex - coursesPerPage >= 0) {
      setCurrentIndex(currentIndex - coursesPerPage);
    }
  };

  const handleSuggestionClick = (courseName: string) => {
    setSearchTerm(courseName);
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="relative flex items-center mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search courses..."
            className="ax-w-2xl px-4 py-3 pl-10 pr-12 text-white bg-black border-2 border-black rounded-full focus:outline-none focus:border-black transition duration-300 ease-in-out"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>

          {/* Suggestions Dropdown */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute z-20 ax-w-2xl mt-1 bg-black text-white border border-black rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-800"
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {visibleCourses.map((course, index) => (
          <div
            key={course._id}
            className={`bg-black rounded-xl shadow-lg overflow-hidden z-10 flex flex-col justify-between ${
              index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
            }`}
          >
            <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex-grow">
              <h2 className="text-2xl font-bold text-white mb-2">{course.name}</h2>
              <p
                className="overflow-hidden text-ellipsis"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {course.description}
              </p>
            </div>
            <div className="p-4">
              <div onClick={() => navigate(`/level/${course._id}`)} className="button">
                <MovingBorderDemo />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousPage}
          className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
          disabled={currentIndex + coursesPerPage >= filteredCourses.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseGrid;
