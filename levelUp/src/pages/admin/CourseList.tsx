import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import AdminSideBar from '../../components/adminSideBar'
import { getAllSubject } from '../../Api/subject'
import { useNavigate } from 'react-router-dom'

const CourseList = () => {
  const [subjects, setSubject]: any = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCource = async () => {
      try {

        const res: any = await getAllSubject()
        console.log('response of api:', res.data)
        setSubject(res.data)
        console.log('state subject', subjects)
      } catch (error: any) {
        console.error(error.message)
      }
    }
    fetchCource()
  }, [])
  useEffect(() => {
    console.log('state subjects:', subjects);
  }, [subjects]);
  return (
    <div>
      <HeaderAdmin />
      <div className="flex flex-1 h-full">
        <AdminSideBar />
        <div className="flex-1 p-10 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold  text-gray-800">Welcome to Admin</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Subject name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    level Count
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Add Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, i) => (

                  <tr className={i % 2 == 0 ? ` bg-gray-50 border-b  ` : 'bg-gray-100 border-b'}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {subject.name}
                    </th>
                    <td className="px-6 py-4">
                      {subject.description}
                    </td>
                    <td className="px-6 py-4">
                      <img src={subject.image} width={50} height={50} alt={subject.name} />
                    </td>
                    <td className="px-6 py-4">
                      {subject.level.length}
                    </td>

                    <td>
                      <button onClick={() => navigate(`/admin/listLevel/${subject._id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">list level</button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseList
