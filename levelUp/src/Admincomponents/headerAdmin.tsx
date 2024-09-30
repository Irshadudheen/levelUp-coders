import React from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../Api/admin'
import { useDispatch } from 'react-redux'
import { clearUser } from '../utils/clearUser'
import useGetAdmin from '../hook/useGetAdmin'

const HeaderAdmin:React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useGetAdmin()
    if(!currentUser){
      navigate('/admin')
    }
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
    <h1 className="text-2xl font-bold cursor-pointer text-white">Admin Dashboard</h1>
    <nav className="space-x-4">
      <a onClick={()=>navigate('/admin/home')} className="text-gray-200 cursor-pointer hover:text-white">Home</a>
      <a href="#" className="text-gray-200 cursor-pointer hover:text-white">Service</a>
    <a onClick={handleLogout} className="text-gray-200 cursor-pointer hover:text-white">Log out</a>
      
  
     
    </nav>
  </header>
    </div>
  )
}

export default HeaderAdmin
