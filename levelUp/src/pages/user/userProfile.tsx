import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';

const UserProfile = () => {
    const [place,setPlace]=useState(null)
    useEffect(()=>{

        fetch('https://ipinfo.io?token=48a4f1aba06f91')
        .then(response => response.json())
        .then(data => {
          const region:string = data.region; // Region (e.g., state, province)
          const country:string = data.country; // Country code (e.g., US, IN)
      setPlace(data)
          console.log(`Region: ${region}`);
          console.log(`Country: ${country}`);
        })
        .catch(error => console.error('Error fetching location:', error));
    },[])
  return (
    <>
    <UserHeader/>
    <div className="min-h-screen bg-gray-900 p-4 mt-14">
    <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <div  className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center border border-gray-700">
    <span className="material-symbols-outlined text-6xl">
account_circle
</span>
<h1>User</h1>
<button>edit</button>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
  <path d="M22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.69a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm14.57 12.76h-3.56v-5.8c0-1.38-.03-3.17-1.93-3.17-1.93 0-2.23 1.5-2.23 3.06v5.9H8.62V9h3.42v1.57h.05c.48-.91 1.65-1.86 3.39-1.86 3.62 0 4.29 2.38 4.29 5.47v6.27z"/>
</svg>
<button>add link</button>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.1.66-.21.66-.48 0-.24-.01-.87-.01-1.7-2.79.61-3.38-1.35-3.38-1.35-.45-1.17-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.23-.26-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.7-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8a9.56 9.56 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.44.1 2.7.64.71 1.03 1.61 1.03 2.7 0 3.85-2.34 4.69-4.58 4.94.36.31.68.93.68 1.87 0 1.35-.01 2.44-.01 2.77 0 .27.17.59.68.48A10.006 10.006 0 0022 12c0-5.52-4.48-10-10-10z"/>
</svg>
<button>add link</button>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.5 7 13 7 13s7-8.5 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
</svg>
 <p>{place?`${place.country},${place.region}`:'place'}</p>
    </div>
    </div>
    </div>
    </div>
    <UserFooter/>
    </>
  );
};

export default UserProfile;