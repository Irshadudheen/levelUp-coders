import React,{useEffect,useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import { adminLogin } from '../../Api/admin';

import {useNavigate} from 'react-router-dom';
import useGetAdmin from '../../hook/useGetAdmin';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { toast } from 'react-toastify';

const Login: React.FC = () => {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  const currentUser= useGetAdmin()
  useEffect(() => {
    
   if(currentUser){
    navigate('/admin/home')
   }
    const img = new Image();
    img.src = "https://raw.githubusercontent.com/tj-webdev/admin-login-form/main/image.jpg";
    img.onload = () => {
      setIsLoading(false);
    };
  });
  const handler = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(email,password)
    if(!/[A-Za-z0-9._%+-]+@gmail.com/.test(email)){
    return  toast.error('give proper strcuture to email')
    }
    const response = await adminLogin(email,password)
    console.log(response,'33333333333333333333333')
    if(response.admin){
      
      
      localStorage.setItem('accesToken',response.accesToken)
      localStorage.setItem('refreshToken',response.refreshToken)
      localStorage.setItem('role',response.role)
      console.log(response,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      dispatch(setUser({
        role:response.admin.role,
        name:response.admin.name,
        email:response.admin.email,
        id:response.admin._id,
        blocked:response.admin.blocked,
        
      }
      ))
      
      
      navigate('/admin/home')
    }else{
      const{message}=response.response?.data
      toast.error(message)

    }

  }
  return (
    <div className="bg-[#E8EDF2] min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center bg-white p-8 shadow-xl max-w-full md:max-w-3xl rounded-lg">
        <div className="w-full md:w-[270px] mb-6 md:mb-0 md:mr-8">
          <form onSubmit={handler}>
            <h2 className="text-[#1c1c1e] mb-5 text-center md:text-left">ADMIN LOGIN</h2>
            <input 
              type="email" 
              placeholder="Admin Email" 
              onChange={e=>setEmail(e.target.value)}
              className="w-full mb-6 p-0 border-b-2 text-black border-[#1c1c1e] focus:outline-none" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={e=>setPassword(e.target.value)}
              className="w-full mb-6 p-0 border-b-2 text-black border-[#1c1c1e] focus:outline-none" 
            />
            <button 
              type="submit" 
              className="w-full text-white bg-[#1c1c1e] rounded-md px-3 py-2 font-medium">
              LOGIN
            </button>
          </form>
        </div>
        <div className="w-full md:w-[300px]">
      {isLoading ? (
        <Skeleton height={300}/>
      ) : (
        <img 
          src="https://raw.githubusercontent.com/tj-webdev/admin-login-form/main/image.jpg" 
          alt="Admin Image" 
          className="w-full rounded-lg"
        />
      )}
    </div>
      </div>
    </div>
  );
}

export default Login;
