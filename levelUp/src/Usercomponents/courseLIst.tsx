import React, { useEffect, useState } from 'react';
import UserHeader from './userHeader';
import UserFooter from './userFooter';
import { getAllCategory, getAllSubject } from '../Api/subject';
import CourseDescription from './CourseDescription';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [viewCategory, setViewCategory] = useState('all');
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
 
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getAllCategory();
        setCategories(res);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategory();
  }, []);
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res: any = await getAllSubject();
        setAllCourses(res.data);
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);
  
  useEffect(() => {
    if (viewCategory === 'all') {
      setCourses(allCourses); // Display all courses
    } else {
      const filtered = allCourses.filter(course => course.categoryId.name === viewCategory);
      setCourses(filtered);
    }
    setCurrentPage(1); // Reset to the first page whenever the category changes
  }, [viewCategory, allCourses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const navigate = useNavigate();

  return (
    <>
  <UserHeader />
  <div className="flex flex-col min-h-screen mt-14 bg-gray-900 text-white">
  <div className="relative">
  <img
    className="w-full h-[calc(100vh/6)] object-cover object-center mt-1"
    src="https://img.freepik.com/free-vector/blue-futuristic-networking-technology_53876-97395.jpg?t=st=1724998389~exp=1725001989~hmac=057348ab28b540da677504923a74e05957df70296d8c2a86a41483900cc1f7c6&w=900"
    alt="Courses Background"
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Courses</h1>
  </div>
</div>
    <main className="flex-grow p-4 md:p-8">
     
      <div className="flex text-white">
        <select
          onChange={e => setViewCategory(e.target.value)}
          className="appearance-none w-1/4 mb-4 bg-gray-800 border border-gray-700 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500 transition-colors duration-200"
        >
          <option value="all">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: coursesPerPage }).map((_, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <Skeleton
                height={160}
                baseColor="#2D2D2D"
                highlightColor="#3A3A3A"
              />
              <Skeleton
                width="80%"
                height={20}
                className="my-4"
                baseColor="#2D2D2D"
                highlightColor="#3A3A3A"
              />
              <Skeleton
                count={2}
                baseColor="#2D2D2D"
                highlightColor="#3A3A3A"
              />
              <Skeleton
                width="40%"
                height={30}
                className="mt-4"
                baseColor="#2D2D2D"
                highlightColor="#3A3A3A"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map(course => (
            <div
              key={course.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg relative"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <CourseDescription description={course.description} />
              <button
                onClick={() => navigate(`/level/${course._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out absolute bottom-4 left-4"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 ${
              currentPage === index + 1 ? 'bg-blue-700' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
    <UserFooter />
  </div>
</>
  );
};

export default CourseList;
