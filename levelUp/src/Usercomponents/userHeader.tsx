import React from 'react';
import { logout } from '../Api/user';
import { clearUser } from '../utils/clearUser';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUser from '../hook/useGetUser';
import { toast } from 'react-toastify';

const UserHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useGetUser();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    const response = await logout();
    if (response.succuss) {
      clearUser(dispatch);
      navigate('/login');
      toast.success('You logged out successfully');
    }
  };
console.log(pathname.split(''),':patname',pathname==='/')
  return (
    <header>
      <nav className="fixed left-0 right-0 top-0 bg-white z-50 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <span className="flex items-center h-10 px-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90">
              LevelUp
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <button
              onClick={currentUser ? handleLogout : () => navigate('/login')}
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              {currentUser ? 'Log out' : 'Log in'}
            </button>
            <a href="#" className="text-white bg-black hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Get started
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a onClick={() => navigate('/')} className={`cursor-pointer py-2 pr-4 pl-3 hover:text-black ${pathname==='/'?'text-black':'text-gray-700'}`}>
                  Home
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/courses')} className={`cursor-pointer py-2 pr-4 pl-3 ${pathname.includes('courses') ? 'text-black' : 'text-gray-700 hover:text-black'}`}>
                  Course
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">
                  Interview
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">
                  Notification
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/profile')} className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
