import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate()
    const {payementId}=useParams()
    useEffect(()=>{
     const sortedId=  localStorage.getItem('paymentId')
        
     if(sortedId!==payementId){
        navigate('/*')
     }else{
        const fetchTheData = async()=>{

           const res= await fetch(`http://localhost:3001/success/${payementId}`)
                
            console.log(res.json())
        }
        fetchTheData()
     }
     
    //  console.clear()

    },[payementId])
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-4">Thank you for your purchase. Your transaction was completed successfully.</p>
        <a onClick={()=>navigate('/')} className="text-blue-500 hover:underline">Return to Home</a>
      </div>
    </div>
  );
};

export default SuccessPage;
