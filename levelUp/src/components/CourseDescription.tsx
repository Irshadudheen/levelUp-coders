import React, { useState } from 'react';

// Define the props type
interface CourseDescriptionProps {
  description: string;
}


const CourseDescription: React.FC<CourseDescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Adjust the length as needed

  return (
    <div>
      <p className={`text-gray-400 ${isExpanded ? 'mb-4' : 'mb-2'} transition-all duration-300`}>
        {isExpanded ? description : `${description.slice(0, maxLength)}${description.length > maxLength ? '...' : ''}`}
      </p>
      {description.length > maxLength && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-600 underline"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default CourseDescription;
