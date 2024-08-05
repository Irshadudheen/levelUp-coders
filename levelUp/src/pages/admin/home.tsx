import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetAdmin from '../../hook/useGetAdmin'
import { logout } from '../../Api/admin'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../utils/clearUser'

const Home:React.FC = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const currentuser = useGetAdmin()
  useEffect(()=>{
    console.log(currentuser,'current user')
    if(!currentuser){
        navigate('/admin')
    }
  })
  const handleLogout = async()=>{
    const resonse = await logout()
    console.log(resonse,'reponse')
    if(resonse.succuss){
    clearUser(dispatch)  
      navigate('/admin')
    }
  }
  return (
    <div className="flex h-screen bg-white text-white">
    {/* Sidebar */}
    <div className="w-1/5 bg-indigo-600 p-5 flex flex-col space-y-4">
      <h1 className="text-xl font-bold text-white mb-6">Admin</h1>
      <div className="space-y-4">
        <div className="flex items-center text-white space-x-2">
          <span className="material-icons">person</span>
          <span>user</span>
        </div>
        <div className="flex items-center text-white space-x-2">
          <span className="material-icons">bar_chart</span>
          <span>levels</span>
        </div>
        <div className="flex items-center text-white space-x-2">
          <span className="material-icons">star</span>
          <span>premium</span>
        </div>
        <div className="flex items-center text-white space-x-2">
          <span className="material-icons">language</span>
          <span>Course</span>
        </div>
      </div>
      <div className="mt-auto flex items-center text-white space-x-2">
        <button>
        <span className="material-icons" onClick={handleLogout}>logout</span>
        <span>Log out</span>
        </button>
       
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-10">
      <h2 className="text-3xl font-bold mb-8 text-black">Welcome to Admin</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Level */}
        <div className="bg-indigo-400 p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Top Level</h3>
          <ul className="space-y-2">
            <li className="bg-indigo-600 p-3 rounded-md flex items-center">
              <span className="material-icons mr-2">person</span>
              <span>name</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex items-center">
              <span className="material-icons mr-2">person</span>
              <span>name</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex items-center">
              <span className="material-icons mr-2">person</span>
              <span>name</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex items-center">
              <span className="material-icons mr-2">person</span>
              <span>name</span>
            </li>
          </ul>
        </div>

        {/* More Hours */}
        <div className="bg-indigo-400 p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-4">More hour</h3>
          <ul className="space-y-2">
            <li className="bg-indigo-600 p-3 rounded-md flex justify-between">
              <span>code</span>
              <span>T</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex justify-between">
              <span>code</span>
              <span>T</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex justify-between">
              <span>code</span>
              <span>T</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex justify-between">
              <span>code</span>
              <span>T</span>
            </li>
            <li className="bg-indigo-600 p-3 rounded-md flex justify-between">
              <span>code</span>
              <span>T</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
