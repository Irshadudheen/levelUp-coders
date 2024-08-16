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
    <a onClick={handleLogout} className="text-gray-200 hover:text-white">Log out</a>
      
  
     
    </nav>
  </header>
    </div>
  )
}

export default HeaderAdmin
