import React from "react";

const CardMember = ({ name, role, imageUrl, quote, linktoFacebook, linktoIntasgram, linktoEmail }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-[395px] w-72 rounded-2xl overflow-hidden shadow-md hover:shadow-lg duration-300 bg-gray-100 relative group">
        {/* Img member */}
        <div className="h-full object-cover">
          <img
            src={imageUrl}
            alt="member-image"
            className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
            onError={(e) => (e.target.src = "./public/Lib-hub.svg")} // Fallback image
          />
        </div>
        {/* Overlay khi hover */}
        <div className="absolute inset-0 bg-pornhub-200 bg-opacity-95 flex items-start justify-start text-white opacity-0 group-hover:opacity-100 transition duration-200 ">
          <div className="mt-5 ml-3">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-base font-bold mt-1">{role}</p>
            <p className="text-lg font-medium mt-20">{quote}</p>
          </div>
          <div className="absolute bottom-0 right-0 p-5">
            <a href={linktoFacebook} className="text-white hover:text-pornhub-200 transition duration-300">
              <i className="fab fa-facebook-f fa-lg ml-5"></i>
            </a>
            <a href={linktoIntasgram} className="text-white hover:text-pornhub-200 transition duration-300">
              <i className="fab fa-instagram fa-lg ml-5"></i>
            </a>
            <a href={linktoEmail} className="text-white hover:text-pornhub-200 transition duration-300">
              <i className="fa-solid fa-envelope fa-lg ml-5"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMember;