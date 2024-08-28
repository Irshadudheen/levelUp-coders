import React, { useEffect, useState } from 'react'
import HeaderAdmin from './headerAdmin'
import { useNavigate } from 'react-router-dom';
import useGetAdmin from '../hook/useGetAdmin';

const Compiler: React.FC = () => {
  const navigate = useNavigate();
  const currentuser = useGetAdmin();
  const [question,setQuestion]=useState('')
  const [functionName,setFunctionName]=useState('')
  const [input,setInput]=useState('')
  const [output,setOutput]=useState('') 
  const [inputType,setInputType]=useState('')
  const [outputType,setOutputType]=useState('')
  useEffect(() => {
      console.log(currentuser, 'current user');
      if (!currentuser) {
          navigate('/admin');
      }
  }, [currentuser, navigate]);
  const handleSubmit =async(e)=>{
    e.preventDefault()
    console.log('submitting');
    console.log(question,functionName,input,output,inputType,outputType)

  }
  return (
    <>
      <HeaderAdmin/>
      <div className="max-w-md mx-auto p-6 text-black bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Compiler Question</h2>
        <form 
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="compiler-question">
              Question
            </label>
            <input
              type="text"
              onChange={(e)=>setQuestion(e.target.value)}
              id="compiler-question"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter the compiler question"
              // onChange={e => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label  className="block text-gray-700 font-semibold mb-2">
              Function name
            </label>
            <div className="mb-4">

            <input type="text" onChange={e=>setFunctionName(e.target.value)} className='w-full border p-2'  placeholder='Function name'  />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Answer 
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                id="question"
                onChange={e=>setInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter input"
              
                required
              />
              <input
                type="text"
                id="question"
                onChange={e=>setInputType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type input"
             
                required
              />
            </div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                id="option1-text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter output"
                onChange={e=>setOutput(e.target.value)}
                required
              />
              <input
                type="text"
                id="option1-text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type output"
                onChange={e=>setOutputType(e.target.value)}
                required
              />
            </div>
         
           
          </div>
          

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
          >
            Add Compiler Question
          </button>
        </form>
      </div>
    </>
  )
}

export default Compiler
