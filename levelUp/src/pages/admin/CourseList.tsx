import React from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import AdminSideBar from '../../components/adminSideBar'

const CourseList = () => {
  return (
    <div>
      <HeaderAdmin/>
      <div className="flex flex-1 h-ful">
        <AdminSideBar/>
        <div className="flex-1 p-10 shadow-md rounded-lg">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome to Admin</h2>
                    <div className="grid md:grid-cols-2 gap-14">
                       
                    </div>
                </div>
        </div>
    </div>
  )
}

export default CourseList
