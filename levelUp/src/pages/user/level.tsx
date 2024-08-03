import React from 'react';

const svgs = [
  <svg key="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
  <svg key="9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0v-4a6 6 0 1 0-12 0v4h2v-4a4 4 0 1 1 8 0v4h2z" /></svg>,
];

const ImageGrid = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 p-4">
        {svgs.map((svg, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
            {svg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
