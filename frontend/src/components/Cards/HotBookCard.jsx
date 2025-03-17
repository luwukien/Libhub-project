import React, { useState, useRef, useEffect } from 'react';

const HotBookCard = ({title, imgUrl, onClick}) => {
  return (
    <div className="cursor-pointer p-4 md:w-[70%] m-auto hover:-translate-y-3 duration-300">
        <div className="h-[430px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg duration-300 bg-gray-50">
          {/* Cover book */}
          <div className="h-[63%] object-cover bg-black">
            <img 
            src={imgUrl} 
            alt="book-cover" 
            className="w-full h-full"
            onClick={onClick}
            onError={(e) => (e.target.src = "./public/Lib-hub.svg")} // Fallback image
            /> 
          </div>
          
          <div className="px-5 py-5">
            <div className="flex items-center justify-center font-extrabold text-xl text-black mb-2 ">{title}</div>
          </div>
        </div>
    </div>
  );
};

  export default HotBookCard;
