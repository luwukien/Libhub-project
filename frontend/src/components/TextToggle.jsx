// src/components/TextToggle.js
import React, { useState } from 'react';

function TextToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-md mx-auto">
      <p className={`${isExpanded ? '' : 'line-clamp-3'}`}>
        Libhub is an innovative improvement to the schools library system, designed to enhance students learning experience. It simplifies the search for academic resources, making it easier to find relevant materials.
        We are Team 4 from JS Club. Our project, Libhub, simplifies resource searching and provides a virtual library simulation, making it easier for students to access and explore academic materials. We aim to optimize the UI to enhance book searching.
      </p>
      <button 
        onClick={toggleText} 
        className="text-blue-500 hover:underline hover:underline-offset-1 text-base"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}

export default TextToggle;
