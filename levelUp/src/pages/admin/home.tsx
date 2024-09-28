import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetAdmin from '../../hook/useGetAdmin'
import { topTenActiveUser } from '../../Api/admin'


import HeaderAdmin from '../../Admincomponents/headerAdmin'
import AdminSideBar from '../../Admincomponents/adminSideBar'

const Home: React.FC = () => {
  const [topTenUser,setTopUser]=useState('')
  
  const navigate = useNavigate()
  const currentuser = useGetAdmin()
  useEffect(() => {
    console.log(currentuser, 'current user')
    if (!currentuser) {
      navigate('/admin')
    }
  })
  useEffect(()=>{
  const  fetchTopTenActiveStudent = async()=>{
      const res = await topTenActiveUser()
      console.log(res)
      setTopUser(res)
    }
    fetchTopTenActiveStudent()
  },[])
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <HeaderAdmin />

      {/* Main Layout */}
      <div className="flex flex-1">
        
      <AdminSideBar/>
       
        {/* Main Content */}
        <div className="flex-1 p-10 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 cursor-pointer">Welcome to Admin</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Level */}
            <div className="bg-blue-200 p-5 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Top Level</h3>
              <ul className="space-y-2">
                {topTenUser && topTenUser.map((user, index) => (
                <li className="bg-blue-500 p-3 rounded-md flex items-center text-white">
                  <span className="material-icons mr-2">{user.userDetails.name}</span>
                  <span>Active Days Count:{user.activeDaysCount}</span>
                </li>))}
              
               
               
              </ul>
            </div>

            {/* More Hours */}
            <div className="bg-blue-200 p-5 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-900">More Hours</h3>
              <ul className="space-y-2">
                <li className="bg-blue-500 p-3 rounded-md flex justify-between text-white">
                  <span>Code</span>
                  <span>T</span>
                </li>
                <li className="bg-blue-500 p-3 rounded-md flex justify-between text-white">
                  <span>Code</span>
                  <span>T</span>
                </li>
                <li className="bg-blue-500 p-3 rounded-md flex justify-between text-white">
                  <span>Code</span>
                  <span>T</span>
                </li>
                <li className="bg-blue-500 p-3 rounded-md flex justify-between text-white">
                  <span>Code</span>
                  <span>T</span>
                </li>
                <li className="bg-blue-500 p-3 rounded-md flex justify-between text-white">
                  <span>Code</span>
                  <span>T</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home
