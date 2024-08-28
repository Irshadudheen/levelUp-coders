import React, { useState } from 'react';
import { printLastSixMonths } from '../service/getMounth';

const ActiveDays = () => {
  const [mounth, setMounth] = useState(printLastSixMonths);
  const activeDays = [
    { day: 'Mon', active: false },
    { day: 'Tue', active: false },
    { day: 'Wed', active: false },
    { day: 'Thu', active: false },
    { day: 'Fri', active: false },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-700 space-y-4 lg:col-span-2">
      <h2 className="text-white text-lg font-bold">Active Days</h2>
      <div className="grid grid-rows-7 gap-2 w-full">
        <div className="items-center justify-center flex">{mounth}</div>
        {activeDays.map((day, index) => (
          <div key={index} className="flex justify-start items-center">
            <div className="text-white mr-2 w-[2.5rem]">{day.day}</div>
            <div className="flex space-x-1">
              {Array(28)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${
                      day.active ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveDays;
