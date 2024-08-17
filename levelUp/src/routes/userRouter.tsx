import { Route,Routes } from 'react-router-dom';
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
const UserRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/otp/:id' element={<OtpPage/>}/>
        <Route path='/newPassword' element={<NewPassword/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/level/:id' element={<Level/>}/>
        <Route path='/video/:levelId' element={<VideoPlayer/>}/>
        <Route path='/quiz/:levelId' element={<Quiz/>}/>
        <Route path='/premium' element={<Premium/>}/>
        <Route path='/loader' element={<BrickLoader/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/compiler/:levelId' element={<Compailer/>}/>
        </Routes>
  )
}

export default UserRouter
