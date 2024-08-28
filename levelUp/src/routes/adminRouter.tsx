import { Route, Routes } from "react-router-dom"
import Login from "../pages/admin/login"
import Home from "../pages/admin/home"
import AddCourse from "../Admincomponents/addsubject"
import CourseList from "../Admincomponents/CourseList"
import Level from "../Admincomponents/Level"
import AddLevel from "../Admincomponents/AddLevel"
import User_mangent from "../Admincomponents/user_mangent"
import UploadVideo from "../Admincomponents/uploadVideo"
import Quiz from "../Admincomponents/quiz"
import Compiler from "../Admincomponents/Compiler"
import ListQuiz from "../Admincomponents/ListQuiz"
import Category from "../Admincomponents/category"
import AddCategory from "../Admincomponents/addCategory"

const adminRouter:React.FC = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path="/addCourse" element={<AddCourse/>} />
      <Route path='/course'element={<CourseList/>}/>
      <Route path="/listLevel/:id" element={<Level/>}/>
      <Route path='/addlevel/:id' element={<AddLevel/>}/>
      <Route path='/alUser' element={<User_mangent/>}/>
      <Route path="/upladVideo/:id" element={<UploadVideo/>}/>
      <Route path='/addQuiz/:id' element={<Quiz/>}/>
      <Route path="/addCompiler/:id" element={<Compiler/>}/>
      <Route path="/listQuiz/:id" element={<ListQuiz/>}/>
      <Route path="/listCategory" element={<Category/>}/>
      <Route path ='/addCategory' element={<AddCategory/>}/>
    </Routes>
  )
}

export default adminRouter
