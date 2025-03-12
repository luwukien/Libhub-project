import React, { useState, useRef, useEffect } from 'react';
import moment from "moment/moment"
import { FaHeart } from "react-icons/fa6";

const BookCard = ({
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
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 cursor-pointer h-[250px]">
      <img
        src={imgUrl}
        alt={title}
        className="w-30 h-auto object-contain rounded-lg"
        onClick={onClick}
      />

      <button className="w-6 h-6 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-1 right-1"
        onClick={onFavouriteClick}
      >
        <FaHeart className={`icon-btn transition-colors duration-300 ${isFavourite ? "text-red-500" : "text-white"}`}
        />
      </button> 

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-xs font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard