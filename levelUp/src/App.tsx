import {Route, Routes} from 'react-router-dom'
import UserRouter from './routes/userRouter'
import useGetUser from './hook/useGetUser'
import { useSelector } from 'react-redux'
import { currentUser } from './@types/currentUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminRouter from './routes/adminRouter'
import { useEffect } from 'react'
const App = () => {
  const navigate = useNavigate()

  const currentUser = useGetUser()
  useSelector((state:currentUser)=>state)
  const dispatch = useDispatch()
  console.log(currentUser,'hai')
useEffect(()=>{
  if(!currentUser){
    navigate('/')
  }

})
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/*' element={<UserRouter/>}/>
      <Route path='/admin/*' element={<AdminRouter/>}/>
    </Routes>
    </>
    
  )
}

export default App
