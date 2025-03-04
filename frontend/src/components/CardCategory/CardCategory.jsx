import React from "react";

const CardCategory = ({id, title, description, imageUrl, linkCategory}) => {
  return (
    <div className="cursor-pointer p-4 w-[85%] m-auto hover:-translate-y-3 duration-300">
      <a href={linkCategory}>
        <div className="h-[430px] rounded-2xl overflow-hidden shadow-md bg-gray-50">
          {/* Cover book */}
          <div className="h-[63%] object-cover bg-black">
            <img src={imageUrl} alt="Book cover" className="w-full h-full"/> 
          </div>
          
          <div className="px-5 py-5">
            <div className="flex items-center justify-center font-extrabold text-xl text-black mb-2 ">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

  export default CardCategory;
