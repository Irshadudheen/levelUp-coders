import { Route, Routes } from "react-router-dom"
import Login from "../pages/admin/login"
import Home from "../pages/admin/home"
import AddCourse from "../pages/admin/subject"
import CourseList from "../pages/admin/CourseList"

const adminRouter:React.FC = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path="/addCourse" element={<AddCourse/>} />
      <Route path='/course'element={<CourseList/>}/>
    </Routes>
  )
}

export default adminRouter
