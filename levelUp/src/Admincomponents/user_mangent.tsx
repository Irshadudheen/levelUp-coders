import React, { useEffect, useState } from 'react'
import { getAllUserData, userBlock } from '../Api/admin'

import HeaderAdmin from './headerAdmin'
import AdminSideBar from './adminSideBar'
import { useNavigate } from 'react-router-dom'
import useGetAdmin from '../hook/useGetAdmin'

const User_mangent:React.FC = () => {
  const navigate = useNavigate();
  const currentuser = useGetAdmin();
  useEffect(() => {
      console.log(currentuser, 'current user');
      if (!currentuser) {
          navigate('/admin');
      }
  }, [currentuser, navigate]);
  const [users, setUser] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAllUserData()
        console.log(res)
        setUser(res)
      } catch (error) {

      }
    }
    fetchUser()
  }, [])
  const handleBlock = async(userid:string)=>{
    try {
      console.log(userid)
      const result = await userBlock(userid)
      const res = await getAllUserData()
      console.log(result)
      setUser(res)
      console.log(res)
    } catch (error:any) {
      console.error(error.message)
    }
  }
  return (
    <>
      <HeaderAdmin />
      <div className="flex  bg-white-800 text-white">
        {/* Sidebar */}
       <AdminSideBar/>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h2 className="text-3xl font-bold mb-8">User Management</h2>

          <div className="bg-indigo-400 p-5 rounded-lg">
            <div className="grid grid-cols-4 gap-4 mb-4 text-center font-bold">
              
              <div>USERNAME</div>
              <div>EMAIL</div>
              <div>STATUS</div>
              <div>ACTION</div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
  {users.map((user, index) => (
    <div
      key={index}
      className="grid grid-cols-4 gap-4 items-center bg-indigo-600 p-4 rounded-md shadow-md"
    >
      <span className="text-white font-medium truncate">{user.name}</span>
      <span className="text-indigo-100 truncate">{user.email}</span>
      <span
        className={`${
          user.blocked ? 'text-red-500' : 'text-white'
        } font-semibold truncate`}
      >
        {user.blocked ? 'Blocked' : 'Not Blocked'}
      </span>
      <button onClick={()=>handleBlock(user._id)} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  ">{user.blocked?'unBlock':'Block'}</button>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_mangent
