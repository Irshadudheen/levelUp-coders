import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseGrid = ({ courses }: any) => {
  const navigate = useNavigate();
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const coursesPerPage = 4; // Number of courses per page

  useEffect(() => {
    setFilteredCourses(courses); // Initially, all courses are visible
  }, [courses]);

  useEffect(() => {
    const updateVisibleCourses = () => {
      const nextIndex = currentIndex % filteredCourses.length;
      setVisibleCourses(filteredCourses.slice(nextIndex, nextIndex + coursesPerPage));
    };

    updateVisibleCourses();
  }, [currentIndex, filteredCourses]);

  const handleNextPage = () => {
    const nextIndex = (currentIndex + coursesPerPage) % filteredCourses.length;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousPage = () => {
    const previousIndex = (currentIndex - coursesPerPage + filteredCourses.length) % filteredCourses.length;
    setCurrentIndex(previousIndex);
  };

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(lowercasedSearchTerm) ||
      course.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredCourses(filtered);
    setCurrentIndex(0); // Reset pagination on search
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex items-center mb-6">
  <div className="relative flex-grow">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search courses..."
      className="w-full px-4 py-3 pl-10 pr-12 text-black bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
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
  </div>
  <button
    onClick={handleSearch}
    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Search
  </button>
</div>

      {/* Course Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {visibleCourses.map((course, index) => (
          <div
            key={course._id}
            className={`bg-customBlue rounded-xl shadow-lg overflow-hidden z-10 ${
              index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
            }`}
          >
            <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-white mb-2">{course.name}</h2>
              <p className="text-gray-400 mb-4 truncate">{course.description}</p>
              <button
                onClick={() => navigate(`/level/${course._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Let's Start!
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseGrid;
