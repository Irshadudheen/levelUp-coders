import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { logout } from '../../Api/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';
import Api from '../../service/axios';
import { getAllSubject } from '../../Api/subject';

const HomePage = () => {
  const dispatch = useDispatch()
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate()
 
  useEffect( 
    () => {
      const fetchSubject= async ()=>{

        const res:any= await getAllSubject()
        console.log(res.data)
        setCourses(res.data);
        console.log(courses)
      }
      fetchSubject()
   
    
  }, [setCourses]);

  return (
    <>
      <UserHeader />
      <div className="bg-gray-900 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto ">
          
         
          <div className="space-y-6">
            {courses.length>0 ? (
              courses.map((course) => (
                <div key={course._id} className="bg-customBlue rounded-xl shadow-lg overflow-hidden">
                  <img src={course.image} alt={course.name} className="w-1/2 h-48 object-fill" />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{course.name}</h2>
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
                  <Skeleton height={192} width={340} baseColor="#1F2937" highlightColor="#374151" />
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
      <nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px text-base h-10">
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>
      <UserFooter/>
    </>
  );
};

export default HomePage;
