
import { useNavigate } from "react-router-dom";
import { signup } from "../../Api/user";
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { validateEmail, validatePassword, validateUsername } from "../../utils/validation";
import {useForm} from 'react-hook-form'
const Register:React.FC = () => {
  type User = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirm_password,setConfirmPassword]=useState('')
    const navigate =useNavigate();
    const check = async (user: User) => {
      console.log("before")
    
      const response = await signup(user);
     
      console.log("resonse from that function-", response)
      if (response.succes) {
       console.log("ha")
        localStorage.setItem("verifyToken",response.verifyToken)
  
       
        navigate(`/otp/${email}`)
      } if (response.response.data.status === 400) {
        toast.error(response.response.data.message)
        // alert("2"+response.response.data.message)
       
      } else {
        // alert(response.response.data.message)
       
  
      }
    };
    const handleFormSubmit = ()=>{
      try {
       
        console.log(name,email,password)
        console.log(password,confirm_password,password==confirm_password)
        if(password!==confirm_password){
          setConfirmError(true)
          return  toast.error('password and confirm password should be same')
        }
        setConfirmError(false)
        const user = {
          name: name || '',
          email: email || '',
          password:password || '',
          confirm_password: confirm_password || '',
        };
        console.log(user)
        check(user)
      } catch (error) {
        console.error(error)
      }
    }
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-customBlue text-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              
              placeholder="Username"
              {...register('name', { validate: { validUsername: (value) => validateUsername(value) } })}
              onChange={(e)=>setName(e.target.value)}
              required
              className={`w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name?.message?'border-red-500 focus:ring-red-500':''}`}
            />
            <p className="text-red-500">{`${errors.name?.message?errors.name.message:''}`}</p>
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
             
              {...register('email', { validate: { validateEmail: (value) => validateEmail(value) } })}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              required
              className={`w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email?.message?'border-red-500 focus:ring-red-500':''}`}
            />
            <p className="text-red-500">{`${errors.email?.message?errors.email.message:''}`}</p>
          </div>
          <div className="mb-4">
      <div className="relative">
        <input
          id="hs-toggle-password"
          type={showPassword ? "text" : "password"}
          {...register('password', { validate: { validatePassword: (value) => validatePassword(value) } })}
              onChange={(e)=>setPassword(e.target.value)}
          className={`w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500  ${errors.password?.message?'border-red-500 focus:ring-red-500':''}`}
          placeholder="Enter password"
          
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
        >
          <svg
            className="shrink-0 size-3.5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {showPassword ? (
              <>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </>
            ) : (
              <>
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </>
            )}
          </svg>
        </button>
      </div>
      <p className="text-red-500">{`${errors.password?.message?errors.password.message:''}`}</p>
    </div>
         
          <div className="mb-4">
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              onChange={e=>setConfirmPassword(e.target.value)}
              required
              className={`w-full p-3 ${confirmError?'text-red-700 border-red-500 focus:ring-red-500':''} bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="mb-6 text-center">
            <button
              type="submit"
              
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="flex items-center justify-center w-1/2 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white font-bold">
          
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 10.74v3.26h5.452c-.218 1.09-1.46 3.192-5.452 3.192-3.278 0-5.941-2.719-5.941-6.07s2.663-6.07 5.941-6.07c1.874 0 3.138.798 3.865 1.492l2.822-2.734C16.993 2.794 14.63 2 12 2 6.486 2 2 6.486 2 12s4.486 10 10 10c5.88 0 9.792-4.17 9.792-10 0-.633-.07-1.268-.194-1.884H12z"
                />
              </svg>
            
              Google
            </a>
            <a href="#" className="flex items-center justify-center w-1/2 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white font-bold">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.248C6.486 2.248 2 6.734 2 12.248c0 5.257 4.052 9.638 9.225 9.966.67.124.922-.292.922-.65v-2.762c-3.782.826-4.581-1.741-4.581-1.741-.62-1.573-1.515-1.992-1.515-1.992-1.22-.835.092-.818.092-.818 1.351.095 2.06 1.387 2.06 1.387 1.195 2.052 3.132 1.45 3.907 1.11.12-.866.467-1.45.85-1.782-3.16-.359-6.489-1.584-6.489-7.04 0-1.553.556-2.832 1.477-3.836-.148-.358-.641-1.808.137-3.764 0 0 1.22-.39 3.978 1.48a13.606 13.606 0 0 1 3.621-.482c1.233.055 2.503.31 3.626.711 2.762-2.871 3.902-1.666 3.902-1.666.665 1.988.242 3.572.12 3.92.897 1.075 1.429 2.381 1.429 3.894 0 5.468-3.275 6.685-6.435 7.06.482.387.912 1.14.912 2.293v3.405c0 .363.251.779.936.65C19.948 22.794 24 18.27 24 12.248 24 6.734 19.514 2.248 12 2.248z"/>
              </svg>
              GitHub
            </a>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400">Already have an account? <a onClick={()=>navigate('/login')} className="text-blue-400 hover:text-blue-300">Login here</a></p>
          </div>
        </form>
      </div>
    </div>
      </>
    );
  };
  
  export default Register;
  