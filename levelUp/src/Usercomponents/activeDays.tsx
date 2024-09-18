import React, { useState, useMemo, useEffect } from 'react';
import { printLastSixMonths } from '../service/getMounth';
import { findActive } from '../Api/user';
import { useGetUserData } from '../hook/useGetUser';

const ActiveDays = () => {
  const [month] = useState(printLastSixMonths);
  const [hoveredDate, setHoveredDate] = useState(null); // Track hovered date
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 }); // Track tooltip position
  const [userActiveDays, setUserActiveDays] = useState(null);
  const user = useGetUserData();

  useEffect(() => {
    const fetchUserActiveData = async () => {
      try {
        const response = await findActive(user.id);
        setUserActiveDays(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserActiveData();
  }, [user.id]);

  const activeDays = [
    { day: 'Mon', active: false },
    { day: 'Tue', active: false },
    { day: 'Wed', active: false },
    { day: 'Thu', active: false },
    { day: 'Fri', active: false },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];

  // Create an array of the last 28 dates
  const dateArray = useMemo(() => {
    const today = new Date();
    const dates = [];
    for (let i = 191; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    return dates;
  }, []);

  // Handle tooltip display and position
  const handleMouseEnter = (e, formattedDate) => {
    const rect = e.target.getBoundingClientRect();
    setHoveredDate(formattedDate);
    setTooltipPos({
      x: rect.left + window.scrollX - rect.width / 2 - 350,
      y: rect.top + window.scrollY - 190,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const isActiveDay = (date) => {
    if (!userActiveDays) return false;
  
    return userActiveDays.days.some((activeDay) => {
      // Convert the active day from the database into a Date object
      const activeDate = new Date(activeDay.date);
  
      // Normalize both dates by setting the time to 00:00:00 for comparison
      const normalizedActiveDate = new Date(activeDate);
      normalizedActiveDate.setHours(0, 0, 0, 0); // Reset time
  
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0); // Reset time
  
      // Compare both dates in milliseconds since both are normalized
      return normalizedActiveDate.getTime() === normalizedDate.getTime();
    });
  };

  return (
    <div className="bg-[#F4F1F8] rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-300 space-y-4 lg:col-span-2">
      <h2 className="text-gray-800 text-lg font-bold">Active Days</h2>
      <div className="grid grid-rows-7 gap-2 w-full relative">
        <div className="items-center text-black justify-center flex">{month}</div>
        {activeDays.map((day, index) => (
          <div key={index} className="flex justify-start items-center">
            <div className="text-gray-800 mr-2 w-[2.5rem]">{day.day}</div>
            <div className="flex space-x-1">
              {Array(29)
                .fill()
                .map((_, weekIndex) => {
                  const date = dateArray[weekIndex * 7 + index];
                  if (date) {
                    const formattedDate = date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });

                    // Check if this date is an active day
                    const isActive = isActiveDay(date);

                    return (
                      <div
                        key={weekIndex}
                        className={`w-3 h-3 ${isActive ? 'bg-green-500' : 'bg-gray-300'} relative`}
                        onMouseEnter={(e) => handleMouseEnter(e, formattedDate)}
                        onMouseLeave={handleMouseLeave}
                      ></div>
                    );
                  }
                })}
            </div>
          </div>
        ))}
        {hoveredDate && (
          <div
            className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm"
            style={{ top: tooltipPos.y, left: tooltipPos.x, transform: 'translateX(-50%)' }}
          >
            {hoveredDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveDays;
