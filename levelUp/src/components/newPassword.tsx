

const NewPassword = () => {
 
    return (
      <>
         <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-customBlue text-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              required
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
      </>
    );
  };
  
  export default NewPassword;
  