import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuiz } from '../../Api/subject'

const ListQuiz:React.FC = () => {
    const [quiz,setQuiz]=useState([])
    const navigate = useNavigate()
    const {id}=useParams()
    useEffect(()=>{

       const fetchQuiz=async()=>{

           const res = await getQuiz(id as string)
           
           if(res){
            setQuiz(res)
           }
        }
        fetchQuiz()
    },[id]
    )
  return (
<>
<HeaderAdmin/>
<div>
<h2 className="text-3xl font-bold  text-gray-800">Welcome to Admin</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
                <tr>
                 
                  <th scope="col" className="px-6 py-3">
                    Question
                  </th>
                  <th scope="col" className="px-6 py-3">
                    option
                  </th>
                  <th scope="col" className="px-6 py-3">
                    answare
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Edit
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {quiz.map((subject, i) => (

                  <tr className={i % 2 == 0 ? ` bg-gray-50 border-b  ` : 'bg-gray-100 border-b'}>
                   
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {subject.question}
                    </td>
                    <td className="px-6 py-4">
    {Object.keys(subject.options).map((key) => (
        <div key={key}>
            {key}
        </div>
    ))}
</td>
                    

                    <td>
                    {Object.keys(subject.options)
        .filter(key => subject.options[key]) // Filter out only the keys with true values
        .map(key => (
            <div key={key}>
                {key}
            </div>
        ))}
                    </td>
                    <td>
                      <button onClick={() => navigate(`/admin/listQuiz/${subject._id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit quiz</button>
                    </td>
                    
                  </tr>
                ))}
               

              </tbody>
            </table>
          </div>
            <button onClick={() => navigate(`/admin/addQuiz/${id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Quiz</button>
        </div>
</>
  )
}

export default ListQuiz
