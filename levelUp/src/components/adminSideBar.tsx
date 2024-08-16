import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSideBar:React.FC = () => {
    const navigate = useNavigate()
  return (

    <div className="w-1/12 bg-blue-800  p-5 flex flex-col space-y-4 hover:w-1/5 transition-all duration-300 group">
    <h1 className="text-xl font-bold text-white mb-6">Admin</h1>
    <div className="space-y-4">
      <div onClick={()=>navigate('/admin/alUser')} className="flex items-center hover:bg-blue-900 text-white space-x-2 py-2 px-3 rounded-md transition-colors duration-300">
        <span className="material-symbols-outlined">account_circle</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">User</span>
      </div>
      <div className="flex items-center hover:bg-blue-900 text-white space-x-2 py-2 px-3 rounded-md transition-colors duration-300">
        <span className="material-symbols-outlined">signal_cellular_alt</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">Levels</span>
      </div>
      <div onClick={()=>navigate('/admin/premium')} className="flex items-center  hover:bg-blue-900 text-white space-x-2 py-2 px-3 rounded-md">
        <span className="material-symbols-outlined">workspace_premium</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">Premium</span>
      </div>
      <div onClick={()=>navigate('/admin/course')}  className="flex items-center hover:bg-blue-900 text-white space-x-2 py-2 px-3 rounded-md transition-colors duration-300">
        <span className="material-symbols-outlined">language</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">Course</span>
      </div>
    </div>
  </div>
    
  )
}

export default AdminSideBar
