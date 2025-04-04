import React, { useState, useRef, useEffect } from 'react';
import moment from "moment/moment"
import { FaHeart } from "react-icons/fa6";

const BookBox = ({
  imgUrl,
  title,
  story,
  author,
  date,
  remainingBook,
  isFavourite,
  onClick,
  onFavouriteClick,
}) => {
  return (
    <div className="box md:w-[calc(50%-55.5px)] lg:w-[calc(33.3%-53.3px)] vlg:w-[calc(20%-30px)] vlg:h-[371px] flex flex-col lg:h-[300px] md:h-[239px]">
      <img
        src={imgUrl}
        alt={title}
        className=" rounded-[30px] basis-[3/4] h-[75%]"
        onClick={onClick}
      />
      <button
        className="w-6 h-6 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-1 right-1"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`icon-btn transition-colors duration-300 ${
            isFavourite ? "text-red-500" : "text-white"
          }`}
        />
      </button>

      <div className="p-4 basis-1/4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1 w-fit h-[25%] text-center">
            <p className="text-black vsm:text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] vlg:text-[16px]">
              {title}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBox;