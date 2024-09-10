import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../Usercomponents/forgotPassword';
import OtpPage from '../Usercomponents/otpPage';
import NewPassword from '../Usercomponents/newPassword';


import Quiz from '../Usercomponents/quiz';
import Premium from '../Usercomponents/premium';
import BrickLoader from '../Usercomponents/brickLoader';
import Compailer from '../Usercomponents/workSpace/compailer';
import EditUserProfile from '../Usercomponents/editUserProfile';
import useGetUser from '../hook/useGetUser';
import CourseList from '../Usercomponents/courseLIst';
import NotFound from '../Usercomponents/notFound';
import { useState,lazy ,Suspense} from 'react';
import ProblemPage from '../Usercomponents/[pid]';
import SuccessPage from '../Usercomponents/successPayment';
import FailurePage from '../Usercomponents/failurePage';
const Login =lazy(()=>import('../pages/user/login'))
const Register =lazy(()=>import('../pages/user/register')) 
const Home =lazy(()=>import('../pages/user/home')) 
const Level =lazy(()=>import('../pages/user/level')) 
const UserProfile =lazy(()=>import('../pages/user/userProfile')) 
const VideoPlayer =lazy(()=>import('../pages/user/video')) 
const UserRouter = () => {
  const currentUser = useGetUser();
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? 'dark' : ''}>
      <Suspense>
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
        <Route path='/compiler/:levelId/:problemId' element={currentUser ? <Compailer /> : <Navigate to={'/login'} />} />
        <Route path='/EditProfile' element={currentUser ? <EditUserProfile /> : <Navigate to={'/login'} />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/paymentSucess/:payementId' element={<SuccessPage />} />
        <Route path='/paymentFailure' element={<FailurePage/>}/>

        <Route path='/*' element={<NotFound />} />
      </Routes>
        </Suspense>
    </div>
  );
};

export default UserRouter;
