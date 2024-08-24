import { Navigate, Route,Routes, useNavigate } from 'react-router-dom';
import Login from "../pages/user/login"
import Register from '../pages/user/register'
import ForgotPassword from '../components/forgotPassword';
import OtpPage from '../components/otpPage';
import NewPassword from '../components/newPassword';
import Home from '../pages/user/home';
import Level from '../pages/user/level';
import VideoPlayer from '../pages/user/video';
import Quiz from '../pages/user/quiz';
import Premium from '../pages/user/premium';
import BrickLoader from '../components/brickLoader';
import UserProfile from '../pages/user/userProfile';
import Compailer from '../pages/user/compailer';
import EditUserProfile from '../components/editUserProfile';
import useGetUser from '../hook/useGetUser';
const UserRouter = () => {
  const currentUser = useGetUser()

  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/otp/:id' element={<OtpPage/>}/>
        <Route path='/newPassword' element={<NewPassword/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/level/:id' element={currentUser?<Level/>:<Navigate to={'/login'}/>}/>
        <Route path='/video/:levelId' element={currentUser?<VideoPlayer/>:<Navigate to={'/login'}/>}/>
        <Route path='/quiz/:levelId' element={currentUser?<Quiz/>:<Navigate to={'/login'}/>}/>
        <Route path='/premium' element={currentUser?<Premium/>:<Navigate to={'/login'}/>}/>
        <Route path='/loader' element={<BrickLoader/>}/>
        <Route path='/profile' element={currentUser?<UserProfile/>:<Navigate to={'/login'}/>}/>
        <Route path='/compiler/:levelId' element={currentUser?<Compailer/>:<Navigate to={'/login'}/>}/>
        <Route path='/EditProfile' element={currentUser?<EditUserProfile/>:<Navigate to={'/login'}/>}/>
        </Routes>
  )
}

export default UserRouter
