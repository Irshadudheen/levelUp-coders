
import React, { useEffect, useState } from 'react';
import{ useNavigate } from "react-router-dom";
import { login,userGoogleLogin } from '../../Api/user';
import { useSelector,useDispatch, Provider } from 'react-redux';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { setUser } from '../../redux/userSlice';

import { currentUser } from '../../@types/currentUser';
import { toast } from 'react-toastify';
import useGetUser from '../../hook/useGetUser';
import { GithubAuthProvider, signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../../service/clientLoginGithub';

const Login:React.FC = () => {

  const [user,setUses]=useState(null)
  const dispatch = useDispatch()
  const signInWithGithub = async () => {
    try {
      const provider =new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
  
      // The signed-in user info.
      const user = result.user;
      console.log('User:', user);

      console.log('Token:', token);
      const res:any = await userGoogleLogin({name:user.displayName,email:user.email,password:user.email})
     
      if(res.user){
        console.log(res.token,'the github token')
        localStorage.setItem('accesToken',res.token.accessToken)
        localStorage.setItem('refreshToken',res.token.refreshToken)
        localStorage.setItem('role',res.token.role)
        dispatch(setUser({
          role:res.token.role,
          name:res.user.name,
          email:res.user.email,
          id:res.user._id,
          blocked:res.user.blocked,
          
        }
        ))
    }else{
      const{message}=res.response?.data
      toast.error(message)
    }
   }catch (error) {
      // Handle Errors here.
      console.error('Error during sign-in:', error);
    }
  };

   

  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const currentUser= useGetUser()
  useEffect(()=>{
    console.log(currentUser,"current user in login")
    if(currentUser){
      navigate('/')
    }
  })
  const googleSubmit= async(credentialResponse:any)=>{
      // const provider = new GoogleAuthProvider()
      // const result = await signInWithPopup(googleauth, provider);
      const decoded:any= jwtDecode(credentialResponse.credential)
        console.log(decoded);
       const response = await userGoogleLogin({name:decoded.name,email:decoded.email,password:decoded.sub})
        console.log(response.user);
        if(response.user){
          localStorage.setItem('accesToken',response.token.accessToken)
          localStorage.setItem('refreshToken',response.token.refreshToken)
          localStorage.setItem('role',response.token.role)
          dispatch(setUser({
            role:response.token.role,
            name:response.user.name,
            email:response.user.email,
            id:response.user._id,
            blocked:response.user.blocked,
            
          }
          ))
          
          
          navigate('/')
        }else{
          const{message}=response.response?.data
          toast.error(message)
        }

  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();
    if(!/[A-Za-z0-9._%+-]+@gmail.com/.test(email)){
    return  toast.error('give proper structure to email')
    }
    const response = await login({email,password})
     
    if(response.user){
      
      console.log(response.token.role,'response of login my form submit')
      localStorage.setItem('accesToken',response.token.accessToken)
      localStorage.setItem('refreshToken',response.token.refreshToken)
      localStorage.setItem('role',response.token.role)
      dispatch(setUser({
        role:response.token.role,
        name:response.user.name,
        email:response.user.email,
        id:response.user._id,
        blocked:response.user.blocked,
        
      }
      ))
      
      
      navigate('/')
    }else{
      const{message}=response.response?.data
      toast.error(message)

    }

    
    
  
  }
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#F4F1F8] text-gray-800 p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login To Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-200 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 bg-gray-200 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-black rounded text-white font-bold"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <GoogleLogin 
              onSuccess={googleSubmit}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <a onClick={signInWithGithub} className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 4.438 9.688 10.125 10.575.75.138 1.025-.325 1.025-.725 0-.362-.012-1.322-.019-2.594-4.136.9-5.03-1.985-5.03-1.985-.682-1.725-1.665-2.187-1.665-2.187-1.363-.932.104-.914.104-.914 1.507.105 2.3 1.55 2.3 1.55 1.34 2.294 3.515 1.632 4.37 1.248.137-.968.522-1.632.95-2.007-3.3-.375-6.77-1.65-6.77-7.342 0-1.623.578-2.947 1.522-3.984-.153-.374-.662-1.88.146-3.915 0 0 1.25-.4 4.1 1.528 1.19-.33 2.47-.496 3.74-.502 1.27.006 2.55.172 3.74.502 2.85-1.928 4.1-1.528 4.1-1.528.808 2.034.3 3.541.146 3.915.944 1.037 1.522 2.361 1.522 3.984 0 5.71-3.47 6.965-6.77 7.335.537.462 1.012 1.378 1.012 2.785 0 2.008-.019 3.628-.019 4.124 0 .4.275.875 1.025.725C19.563 21.985 24 17.6 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </a>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account? <a onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer hover:text-blue-700">Sign up here</a></p>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default Login;
