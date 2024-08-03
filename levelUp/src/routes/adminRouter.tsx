import { Route, Routes } from "react-router-dom"
import Login from "../pages/admin/login"
import Home from "../pages/admin/home"

const adminRouter:React.FC = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  )
}

export default adminRouter
