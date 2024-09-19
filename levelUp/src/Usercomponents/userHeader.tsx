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
    try {
      const response = await logout();
      if (response.succuss) {
        clearUser(dispatch);
        navigate('/login');
        toast.success('You logged out successfully');
      } else {
        clearUser(dispatch);
      }
    } catch (error) {}
  };

  return (
    <header>
      <nav className="fixed left-0 right-0 top-0 bg-white z-50 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <button className="flex items-center">
            <span className="flex items-center h-10 px-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90">
              LevelUp
            </span>
          </button>
          <div className="flex items-center lg:order-2">
            <button
              onClick={currentUser ? handleLogout : () => navigate('/login')}
              className="text-white bg-black hover:bg-black focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              {currentUser ? 'Log out' : 'Log in'}
            </button>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className={`cursor-pointer py-2 pr-4 pl-3 hover:text-black ${pathname === '/' ? 'text-black' : 'text-gray-700'}`}>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/courses')}
                  className={`cursor-pointer py-2 pr-4 pl-3 ${pathname.includes('courses') ? 'text-black' : 'text-gray-700 hover:text-black'}`}>
                  Course
                </button>
              </li>
              <li>
                <button className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">Interview</button>
              </li>
              <li>
                <button className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">Notification</button>
              </li>
              <li>
                <button onClick={() => navigate('/profile')} className="cursor-pointer py-2 pr-4 pl-3 text-gray-700 hover:text-black">
                  Profile
                </button>
              </li>
              <li className="relative group">
                <button
                  onClick={() => navigate('/premium')}
                  className="cursor-pointer h-full py-2 pr-4 pl-3 text-gray-700 hover:text-black">
                  Store
                </button>
                {/* Dropdown menu */}
                <div className="absolute left-0 hidden  w-40 bg-white rounded-md shadow-lg group-hover:block">
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <button 
                        onClick={() => navigate('/premium')}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        shop
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate('/order')}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Order
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
