import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../Api/user";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(email)
    const res= forgotPassword(email)
    if(res){
      navigate('/')
    }
  }
  const [email,setEmail]=useState('')
    return (
      <>
         <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-customBlue text-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Enter Your Email</label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
            >
              Send Reset Link
            </button>
          </div>
          <div className="text-center mt-4">
            <a onClick={()=>navigate('/')} className="text-gray-400 hover:text-white">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
      </>
    );
  };
  
  export default ForgotPassword;
  