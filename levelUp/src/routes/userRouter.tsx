import { Route,Routes } from 'react-router-dom';
import Login from "../pages/user/login"
import Register from '../components/register'
import ForgotPassword from '../components/forgotPassword';
import OtpPage from '../components/otpPage';
import NewPassword from '../components/newPassword';
import Home from '../pages/user/home';
import Level from '../pages/user/level';
import VideoPlayer from '../pages/user/video';
import Quiz from '../pages/user/quiz';
import Premium from '../pages/user/premium';
const UserRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/otp/:id' element={<OtpPage/>}/>
        <Route path='/newPassword' element={<NewPassword/>}/>
        <Route path='/dashboard' element={<Home/>}/>
        <Route path='/level' element={<Level/>}/>
        <Route path='/video' element={<VideoPlayer/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/premium' element={<Premium/>}/>
        </Routes>
  )
}

export default UserRouter
