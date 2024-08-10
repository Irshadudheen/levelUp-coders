import React, { useState } from 'react';

const PricingTable = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Core',
      price: 12,
      description: 'Best for solo creators',
      features: [
        '100MB Cloud storage',
        '100+ prompt templates',
        '5 projects',
        '24/7 support'
      ],
      icon: '○',
      color: 'text-cyan-400'
    },
    {
      name: 'Overdrive',
      price: 59,
      description: 'Most popular plan',
      features: [
        'All Starter features',
        '1TB additional storage',
        'Unlimited projects',
        'Analytics'
      ],
      icon: '△',
      color: 'text-green-400',
      popular: true
    },
    {
      name: 'Team',
      price: 29,
      description: 'Exclusively for teams',
      features: [
        'All Overdrive features',
        '10TB additional storage',
        '50% off per member',
        'Real-time collaboration'
      ],
      icon: '⟳',
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950 opacity-60"></div>
      
      <div className="max-w-5xl w-full z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-900 rounded-full p-1 shadow-lg">
            <button 
              className={`px-4 py-2 rounded-full ${billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-blue-400'} transition duration-300`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${billingCycle === 'annual' ? 'bg-blue-600 text-white' : 'text-blue-400'} transition duration-300`}
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
              className={`relative bg-blue-900 rounded-lg p-8 flex flex-col shadow-lg hover:shadow-xl transition duration-300 ${plan.popular ? 'border-4 border-green-400 transform scale-105' : 'border border-gray-800'}`}
            >
              <div className={`${plan.color} text-4xl mb-4`}>
                {plan.icon}
              </div>
              <h3 className="text-white text-3xl font-extrabold mb-2">
                ${plan.price}<span className="text-lg font-normal">/mo</span>
              </h3>
              <p className="text-gray-400 mb-6 text-lg">{plan.description}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-lg">
                    <span className="mr-2 text-blue-400">•</span>{feature}
                  </li>
                ))}
              </ul>
              <button className="mt-auto bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-6 rounded-full font-semibold shadow-md transform hover:-translate-y-1 transition duration-300">
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
  );
};

export default PricingTable;
