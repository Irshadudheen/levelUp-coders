import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';
import useGetUser, { useGetUserData } from '../../hook/useGetUser';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
const UserProfile = () => {
  const navigate = useNavigate()
  const [place, setPlace] = useState(null);
  const currentuser = useGetUserData()
  console.log(currentuser)
  useEffect(() => {
    fetch('https://ipinfo.io?token=')
      .then(response => response.json())
      .then(data => {
        const region = data.region;
        const country = data.country;
        setPlace(data);
        console.log(`Region: ${region}`);
        console.log(`Country: ${country}`);
      })
      .catch(error => console.error('Error fetching location:', error));
  }, []);

  const activeDays = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: false },
    { day: 'Wed', active: true },
    { day: 'Thu', active: false },
    { day: 'Fri', active: true },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];
  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-900 p-4 mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-700 space-y-4">
              <div className="flex items-center justify-between w-full">
                <span className="material-symbols-outlined text-6xl text-white">
                  account_circle
                </span>
                <h1 className="text-white">{currentuser.name}</h1>
              </div>
              <div className="flex item-center justify-between w-full">
              Email:-
              <p className='truncate'>{currentuser.email}</p>
              </div>
              <Button onClick={()=>navigate('/EditProfile')} variant="contained">Edit</Button>
              <div className="flex items-center justify-between w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.69a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm14.57 12.76h-3.56v-5.8c0-1.38-.03-3.17-1.93-3.17-1.93 0-2.23 1.5-2.23 3.06v5.9H8.62V9h3.42v1.57h.05c.48-.91 1.65-1.86 3.39-1.86 3.62 0 4.29 2.38 4.29 5.47v6.27z" />
                </svg>
                <button className="text-blue-400 hover:text-blue-500">Add link</button>
              </div>
              <div className="flex items-center justify-between w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.5 7 13 7 13s7-8.5 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p className="text-white text-right">{place ? `${place.country}, ${place.region}` : 'Place'}</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-700 space-y-4 lg:col-span-2">
      <h2 className="text-white text-lg font-bold">Active Days</h2>
      <div className="grid grid-cols-7 gap-2 w-full">
        {activeDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-white mb-2">{day.day}</div>
            <div
              className={`w-6 h-6 rounded-full ${
                day.active ? 'bg-green-500' : 'bg-gray-600'
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default UserProfile;