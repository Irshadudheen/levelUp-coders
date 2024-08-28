import React, { useState, useEffect } from 'react';
import { otpVerify } from '../Api/user';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const OtpForm:React.FC = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string>("");
  const [counter, setCounter] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
const {id}=useParams()
  useEffect(() => {
    const timer:any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const handleResend = () => {
    setCounter(60);
    setResendDisabled(true);
    
  };
  const handleSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(otp,id)
    if(otp.length==6){
      const response:any =await  otpVerify(otp,id)

      if(response._id){
       return navigate('/')
      }
      toast.error(response.response.data.message)

      
    }else{
      toast.error('Please enter 6 dight')
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-customBlue text-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
        <form  onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-bold mb-2">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              onChange={(e)=>setOtp(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
            >
              Verify
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className={`text-gray-400 hover:text-white ${resendDisabled ? 'cursor-not-allowed' : ''}`}
          >
            Resend OTP {resendDisabled && `in ${counter}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
