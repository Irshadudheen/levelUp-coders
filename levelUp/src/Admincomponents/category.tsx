import React, { useEffect } from 'react'
import HeaderAdmin from './headerAdmin'
import AdminSideBar from './adminSideBar'
import { getAllCategory } from '../Api/subject'
import { useNavigate } from 'react-router-dom'

const Category:React.FC = () => {
    const [category, setCategory] = React.useState([])
    const navigate = useNavigate()
    useEffect(()=>{
      const  fetchAllCategory=async()=>{
        try {
            const res = await getAllCategory()
            setCategory(res)
        } catch (error) {
            
        }
      }
      fetchAllCategory()
    },[])
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
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
                    Category name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th>Edit</th>
                 
                  
                </tr>
              </thead>
              <tbody>
                {
                   category.length>0&& category.map((item, i) => (
                    <tr className={i % 2 == 0 ? ` bg-gray-50 border-b  ` : 'bg-gray-100 border-b'}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.name}
                    </th>
                    <td className="px-6 py-4">
                      {item.description}
                    </td>
                   
                    <td>
                      <button onClick={() => navigate(`/admin/editCategory/${subject._id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                    </td>
                  </tr>
                   ))
                }
              </tbody>
              </table>
              <button onClick={()=>navigate('/admin/addCategory')} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>add Category</button>
              </div>
              </div>
      </div>
    </div>
  )
}

export default Category
