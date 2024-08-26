import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';
import { getAllSubject } from '../../Api/subject';
import CourseDescription from '../../components/CourseDescription';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the skeleton CSS for styling
import { Navigate, useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage] = useState<number>(6); // Adjust the number of courses per page
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res: any = await getAllSubject();
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Calculate the index of the last course on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  // Calculate the index of the first course on the current page
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  // Get the current courses
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const navigate = useNavigate()
  return (
    <>
      <UserHeader />
      <div className="flex flex-col min-h-screen mt-14 bg-gray-900 text-white">
        <main className="flex-grow p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Courses</h1>
          
          {/* Display Skeletons or Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: coursesPerPage }).map((_, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <Skeleton height={160} baseColor="#2D2D2D" highlightColor="#3A3A3A"/>
                  <Skeleton width="80%" height={20} className="my-4 "baseColor="#2D2D2D" highlightColor="#3A3A3A" />
                  <Skeleton count={2} baseColor="#2D2D2D" highlightColor="#3A3A3A"/>
                  <Skeleton width="40%" height={30} className="mt-4 " baseColor="#2D2D2D" highlightColor="#3A3A3A"  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map(course => (
               <div key={course.id} className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
               <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
               <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
               <CourseDescription description={course.description} />
               <button onClick={()=>navigate(`/level/${course._id}`)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out absolute bottom-4 left-4">
                 View Details
               </button>
             </div>
             
              ))}
            </div>
          )}
          
          {/* Pagination Controls */}
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
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
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


