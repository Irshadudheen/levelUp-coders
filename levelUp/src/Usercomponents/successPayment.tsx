import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentSuccess } from '../Api/payment';
import { useGetUserData } from '../hook/useGetUser';

const SuccessPage = () => {
  const user =useGetUserData()
    const navigate = useNavigate()
    const {payementId}=useParams()
    useEffect(()=>{
     const sortedId=  localStorage.getItem('paymentId')
        
     if(sortedId!==payementId){
        navigate('/*')
     }else{
        const fetchTheData = async()=>{
          console.log()
         const data = localStorage.getItem('subscriptionType')
          if(data){
            console.log( JSON.parse(data))
            const subscriptionType = JSON.parse(data)
            const resoponse = await paymentSuccess(payementId,user.id,subscriptionType)
            console.log(user.id)
            console.log(resoponse)
          }
          //  const res= await fetch(`http://localhost:3001/success/${payementId}`).then(res=>res.json()).then(data=>console.log(data))
                

            
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
