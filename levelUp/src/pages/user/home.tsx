import React, { useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import image from '/file (1).png';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../Usercomponents/userHeader';
import UserFooter from '../../Usercomponents/userFooter';
import { getAllSubject } from '../../Api/subject';
import useGetUser from '../../hook/useGetUser';
import CourseGrid from '../../Usercomponents/CourseGrid';

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const currentUser = useGetUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
    const fetchSubject = async () => {
      const res: any = await getAllSubject();
      setCourses(res.data);
    };
    fetchSubject();
  }, [setCourses, currentUser]);

  return (
    <div className='relative'>
      <UserHeader />
      <div className="bg-white min-h-screen py-8 px-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={image} alt="" className="object-contain w-full h-auto" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mt-8 md:mt-52">Welcome!</h1>
            <p className="text-lg nerko-one-regular text-gray-700 mt-4 px-4 md:px-0">
              LevelUp is your interactive learning platform that turns coding into a game.
              Enhance your coding skills by progressing through engaging levels designed
              to make learning fun and effective. Start your journey with us today!
            </p>
          </div>
        </div>
        <h1 className='text-4xl font-bold ml-10 text-gray-900'>Study plan</h1>
        <div className="w-full mt-2 mx-auto">
          <CourseGrid courses={courses} />
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default HomePage;
