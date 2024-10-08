import React, { useState, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js'
import { paymentSuccess } from '../Api/payment';
import UserHeader from './userHeader';
const PricingTable = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [prices, setPrices] = useState({
    Core: 12,
    Overdrive: 59,
    Team: 49,
  });

  const plans = [
    {
      name: 'Core',
      monthlyPrice: 12,
      description: 'Best for Users',
      features: [
        'premium level ',
        'Interview',
      
      ],
      icon: '○',
      color: 'text-cyan-400'
    },
    {
      name: 'Overdrive',
      monthlyPrice: 59,
      description: 'Most popular plan',
      features: [
        'All course and level',
        'Interview',
       
      ],
      icon: '△',
      color: 'text-green-400',
      popular: true
    },
    {
      name: 'Team',
      monthlyPrice: 49,
      description: 'Exclusively plan',
      features: [
        'Premium Course',
        'Interview',
      ],
      icon: '⟳',
      color: 'text-cyan-400'
    }
  ];

  useEffect(() => {
    let interval;
    if (billingCycle === 'annual') {
      interval = setInterval(() => {
        setPrices(prevPrices => ({
          Core: prevPrices.Core < 12 +100 ? prevPrices.Core + 1 : prevPrices.Core,
          Overdrive: prevPrices.Overdrive < 59 + 100 ? prevPrices.Overdrive + 1 : prevPrices.Overdrive,
          Team: prevPrices.Team < 49 + 100 ? prevPrices.Team + 1 : prevPrices.Team,
        }));
      }, 10); // Adjust speed as needed
    } else {
      interval = setInterval(() => {
        setPrices(prevPrices => ({
          Core: prevPrices.Core > 12 ? prevPrices.Core - 1 : prevPrices.Core,
          Overdrive: prevPrices.Overdrive > 59 ? prevPrices.Overdrive - 1 : prevPrices.Overdrive,
          Team: prevPrices.Team > 49 ? prevPrices.Team - 1 : prevPrices.Team,
        }));
      }, 1); // Adjust speed as needed
    }

    return () => clearInterval(interval);
  }, [billingCycle]);

  const handlePremium = async(index)=>{
    try {
      console.log(index);
      console.log(plans[index])
      console.log(billingCycle)
      
      const stripe = await loadStripe('pk_test_51PwPPbRu1UJ6KeMyzIFacH3x85ngUKuiMfLzfK6FwLUOGEncRjGXNPv4Wwpr9vrKYzjOR8i2iB7jGhrC767VTPLh00godGnlq1');
      
      const body = plans[index]
      if(billingCycle!=='monthly'){
        
        body.monthlyPrice =body.monthlyPrice+100
      }
      console.log(body,'body')
      localStorage.setItem('subscriptionType',JSON.stringify(body))
      console.log(localStorage.getItem('subscriptionType'))
      console.log(body)
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      
      const session = await response.json();
      console.log(session);
      // stripe.
      localStorage.setItem('paymentId',session.id)
      if (session && session.id) {
        console.log('hahda')
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,  // Pass the session ID from the backend
        });
        
        if (error) {
          console.log('haidhaiah')
          console.error('Stripe checkout error:', error.message);
        }
      } else {
        console.error('Failed to create checkout session');
      }
      
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <>
    <UserHeader/>
    <div className="min-h-screen mt-10 bg-white flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white opacity-60"></div>
      
      <div className="max-w-5xl w-full z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 rounded-full p-1 shadow-lg">
            <button 
              className={`px-4 py-2 rounded-full ${billingCycle === 'monthly' ? 'bg-black text-white' : 'text-black'} transition duration-300`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${billingCycle === 'annual' ? 'bg-black text-white' : 'text-black'} transition duration-300`}
              onClick={() => setBillingCycle('annual')}
              >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
            key={index} 
            className={`relative bg-white rounded-lg p-8 flex flex-col shadow-lg hover:shadow-xl transition duration-300 ${plan.popular ? 'border-4 border-green-400 transform scale-105' : 'border border-gray-300'}`}
            >
              <div className={`${plan.color} text-4xl mb-4`}>
                {plan.icon}
              </div>
              <h3 className="text-gray-800 text-3xl font-extrabold mb-2">
                ${prices[plan.name]}<span className="text-lg font-normal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </h3>
              <p className="text-gray-600 mb-6 text-lg">{plan.description}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 text-lg">
                    <span className="mr-2 text-blue-500">•</span>{feature}
                  </li>
                ))}
              </ul>
              <button onClick={()=>handlePremium(index)} className="mt-auto bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-600 text-white py-3 px-6 rounded-full font-semibold shadow-md transform hover:-translate-y-1 transition duration-300">
                Get Started
              </button>
              {plan.popular && (
                <p className="absolute -top-3 -right-3 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                  Most Popular
                </p>
              )}
              {plan.popular && <p className="text-green-400 text-sm mt-2 text-center">Limited time offer</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
          </>
  );
};

export default PricingTable;