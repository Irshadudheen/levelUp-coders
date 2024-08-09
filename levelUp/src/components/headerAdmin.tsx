import React from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../Api/admin'
import { useDispatch } from 'react-redux'
import { clearUser } from '../utils/clearUser'

const HeaderAdmin:React.FC = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleLogout = async()=>{
        const resonse = await logout()
        console.log(resonse,'reponse')
        if(resonse.succuss){
        clearUser(dispatch)  
          navigate('/admin')
        }
      }
  return (
    <div>
      <header className="w-full bg-blue-900 p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
    <nav className="space-x-4">
      <a href="#" className="text-gray-200 hover:text-white">Home</a>
      <a href="#" className="text-gray-200 hover:text-white">Service</a>
    <a href="#" className="text-gray-200 hover:text-white">Settings</a>
      <div className="relative group">
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ul className="space-y-2 p-2">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded-md">Profile</a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded-md">Account Settings</a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded-md">Help</a>
        </li>
        <li>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md bg-gray-800 text-gray-200">Log out</button>
        </li>
      </ul>
    </div>
  </div>
     
    </nav>
  </header>
    </div>
  )
}

export default HeaderAdmin
