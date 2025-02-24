import React, { useState, useRef, useEffect } from 'react';
import moment from "moment/moment"
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr"
import { useNavigate } from 'react-router-dom';

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
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 relative cursor-pointer">
      <img
        src={imgUrl}
        alt={title}
        className="w-30 h-60 object-cover rounded-lg"
        onClick={onClick}
      />
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date ? moment(date).format("Do MMM YYY") : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard