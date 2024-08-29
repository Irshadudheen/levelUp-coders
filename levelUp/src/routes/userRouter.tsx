import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "../pages/user/login";
import Register from '../pages/user/register';
import ForgotPassword from '../Usercomponents/forgotPassword';
import OtpPage from '../Usercomponents/otpPage';
import NewPassword from '../Usercomponents/newPassword';
import Home from '../pages/user/home';
import Level from '../pages/user/level';
import VideoPlayer from '../pages/user/video';
import Quiz from '../Usercomponents/quiz';
import Premium from '../Usercomponents/premium';
import BrickLoader from '../Usercomponents/brickLoader';
import UserProfile from '../pages/user/userProfile';
import Compailer from '../Usercomponents/compailer';
import EditUserProfile from '../Usercomponents/editUserProfile';
import useGetUser from '../hook/useGetUser';
import CourseList from '../Usercomponents/courseLIst';
import NotFound from '../Usercomponents/notFound';
import { useState } from 'react';

const UserRouter = () => {
  const currentUser = useGetUser();
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? 'dark' : ''}>
      <Routes>
        <Route path='/login' element={<Login  />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/otp/:id' element={<OtpPage />} />
        <Route path='/newPassword' element={<NewPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/level/:id' element={currentUser ? <Level /> : <Navigate to={'/login'} />} />
        <Route path='/video/:levelId' element={currentUser ? <VideoPlayer /> : <Navigate to={'/login'} />} />
        <Route path='/quiz/:levelId' element={currentUser ? <Quiz /> : <Navigate to={'/login'} />} />
        <Route path='/premium' element={currentUser ? <Premium /> : <Navigate to={'/login'} />} />
        <Route path='/loader' element={<BrickLoader />} />
        <Route path='/profile' element={currentUser ? <UserProfile /> : <Navigate to={'/login'} />} />
        <Route path='/compiler/:levelId' element={currentUser ? <Compailer /> : <Navigate to={'/login'} />} />
        <Route path='/EditProfile' element={currentUser ? <EditUserProfile /> : <Navigate to={'/login'} />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
