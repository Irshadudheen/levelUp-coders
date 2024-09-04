import React, { useState, useEffect } from 'react';

const PricingTable = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [prices, setPrices] = useState({
    Core: 12,
    Overdrive: 59,
    Team: 29,
  });

  const plans = [
    {
      name: 'Core',
      monthlyPrice: 12,
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
      monthlyPrice: 59,
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
      monthlyPrice: 29,
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

  useEffect(() => {
    let interval;
    if (billingCycle === 'annual') {
      interval = setInterval(() => {
        setPrices(prevPrices => ({
          Core: prevPrices.Core < 12 +100 ? prevPrices.Core + 1 : prevPrices.Core,
          Overdrive: prevPrices.Overdrive < 59 + 100 ? prevPrices.Overdrive + 1 : prevPrices.Overdrive,
          Team: prevPrices.Team < 29 + 100 ? prevPrices.Team + 1 : prevPrices.Team,
        }));
      }, 10); // Adjust speed as needed
    } else {
      interval = setInterval(() => {
        setPrices(prevPrices => ({
          Core: prevPrices.Core > 12 ? prevPrices.Core - 1 : prevPrices.Core,
          Overdrive: prevPrices.Overdrive > 59 ? prevPrices.Overdrive - 1 : prevPrices.Overdrive,
          Team: prevPrices.Team > 29 ? prevPrices.Team - 1 : prevPrices.Team,
        }));
      }, 1); // Adjust speed as needed
    }

    return () => clearInterval(interval);
  }, [billingCycle]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
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
              <button className="mt-auto bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-600 text-white py-3 px-6 rounded-full font-semibold shadow-md transform hover:-translate-y-1 transition duration-300">
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
