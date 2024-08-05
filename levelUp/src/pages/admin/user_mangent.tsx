import React from 'react'

const user_mangent = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-indigo-600 p-5 flex flex-col space-y-4">
        <h1 className="text-xl font-bold mb-6">Admin</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 bg-yellow-400 p-2 rounded">
            <span className="material-icons">person</span>
            <span>user</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons">bar_chart</span>
            <span>levels</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons">star</span>
            <span>premium</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons">language</span>
            <span>Course</span>
          </div>
        </div>
        <div className="mt-auto flex items-center space-x-2">
          <span className="material-icons">logout</span>
          <span>Log out</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-8">User Management</h2>

        <div className="bg-indigo-400 p-5 rounded-lg">
          <div className="grid grid-cols-4 gap-4 mb-4 text-center font-bold">
            <div>IMAGE</div>
            <div>USERNAME</div>
            <div>EMAIL</div>
            <div>ACTION</div>
          </div>

          {/* Users List */}
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center bg-indigo-600 p-3 rounded-md">
                <span className="material-icons">person</span>
                <span>name</span>
                <span>email</span>
                <button className="bg-green-500 p-2 rounded text-sm">B</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default user_mangent
