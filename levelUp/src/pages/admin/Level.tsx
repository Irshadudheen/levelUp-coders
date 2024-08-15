import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import AdminSideBar from '../../components/adminSideBar'
import { getLevel } from '../../Api/subject'
import { useNavigate, useParams } from 'react-router-dom'

const Level = () => {
    const [level,setLevel]=useState([])
    const {id}=useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchLevel = async()=>{
            try {
                const res:any= await getLevel(id as string)
                console.log(res)
                setLevel(res.data)
            } catch (error:any) {
                console.log(error)
            }
        }
        fetchLevel()
    },[])
    useEffect(() => {
        console.log('state level:', level);
      }, [level]);
  return (
    <div className='text-black'>
   <HeaderAdmin/>
   <div className="flex flex-1">
    <AdminSideBar/>
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
                    upload video
                  </th>
                  <th scope="col" className="px-6 py-3">
                    add quiz
                  </th>
                </tr>
              </thead>
              <tbody>
                {level.map((subject, i) => (

                  <tr className={i % 2 == 0 ? ` bg-gray-50 border-b  ` : 'bg-gray-100 border-b'}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {subject.name}
                    </th>
                    <td className="px-6 py-4">
                      {subject.videoDescription}
                    </td>
                    <td className="px-6 py-4">
                      <img src={subject.image} width={50} height={50} alt={subject.name} />
                    </td>
                    

                    <td>
                      <button onClick={() => navigate(`/admin/upladVideo/${subject._id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">upload Video</button>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/admin/addQuiz/${subject._id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">add video</button>
                    </td>
                  </tr>
                ))}
               

              </tbody>
            </table>
          </div>
            <button onClick={() => navigate(`/admin/addlevel/${id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Level</button>
        </div>
   </div>
    </div>
  )
}

export default Level
