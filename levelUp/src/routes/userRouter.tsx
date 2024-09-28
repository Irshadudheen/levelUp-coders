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

import NotFound from '../Usercomponents/notFound';
import { lazy ,Suspense} from 'react';

import SuccessPage from '../Usercomponents/successPayment';
import FailurePage from '../Usercomponents/failurePage';
import Room from '../Usercomponents/interview/room';
import OrderTable from '../Usercomponents/premium/order';
const CourseList = lazy(()=>import('../Usercomponents/courseLIst'))
const Login =lazy(()=>import('../pages/user/login'))
const Register =lazy(()=>import('../pages/user/register')) 
const Home =lazy(()=>import('../pages/user/home')) 
const Level =lazy(()=>import('../pages/user/level')) 
const UserProfile =lazy(()=>import('../Usercomponents/profile/userProfile')) 
const VideoPlayer =lazy(()=>import('../pages/user/video')) 
const InterviewHome=lazy(()=>import('../Usercomponents/interview/interviewHome'))
const UserRouter = () => {
  const currentUser = useGetUser();


  return (
    <>
      <Suspense fallback={<BrickLoader />}>
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
        <Route path='/interview' element={currentUser?<InterviewHome/> : <Navigate to={'/login'}/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
        <Route path='/*' element={<NotFound />} />
        <Route path='/order' element={<OrderTable/>}/>
      </Routes>
        </Suspense>
    </>
  );
};

export default UserRouter;
