import React from "react";

const CardCategory = ({id, title, description, imageUrl, linkCategory}) => {
  return (
    <div className="cursor-pointer hover:-translate-y-3 duration-300 p-4">
      <a href={linkCategory} className="">
        <div className="max-w-cardCategory h-[430px] rounded-2xl overflow-hidden shadow-md bg-gray-50">
          {/* Cover book */}
          <img className="max-w-cardCategory h-4/6 object-cover" src={imageUrl} alt="Book cover" />
          <div className="px-5 py-5">
            <div className="flex items-center justify-center font-extrabold text-xl text-blac mb-2 ">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

  export default CardCategory;
