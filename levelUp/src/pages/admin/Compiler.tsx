import React from 'react'
import HeaderAdmin from '../../components/headerAdmin'

const Compiler: React.FC = () => {
  return (
    <>
      <HeaderAdmin/>
      <div className="max-w-md mx-auto p-6 text-black bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Compiler Question</h2>
        <form 
          // onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="compiler-question">
              Question
            </label>
            <input
              type="text"
              id="compiler-question"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter the compiler question"
              // onChange={e => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Answer 
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                id="option1-text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter input"
                // onChange={e => setOption1(e.target.value)}
                required
              />
              <input
                type="text"
                id="option1-text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type input"
                // onChange={e => setOption1(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                id="option1-text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter output"
                // onChange={e => setOption1(e.target.value)}
                required
              />
              <input
                type="text"
                id="option1-text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type output"
                // onChange={e => setOption1(e.target.value)}
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
