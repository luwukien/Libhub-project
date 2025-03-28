import React from 'react';
import { FaHeart } from "react-icons/fa6";

const BookCard = ({
  imgUrl,
  title,
  isFavourite,
  onClick,
  onFavouriteClick,
}) => {
  return (
    <div className="relative box aspect-[4/3] md:w-[calc(50%-55.5px)] lg:w-[calc(33.3%-53.3px)] vlg:w-[calc(25%-42.5px)] 
                    sm:w-[182px] sm:h-[363px] flex flex-col vlg:h-[371px] lg:h-[300px] md:h-[424px] vsm:w-[69px] vsm:h-[153px]">
      
      {/* Hình ảnh bìa sách */}
      <div className="relative w-full h-full">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full rounded-[30px] object-cover"
          onClick={onClick}
        />
        
        {/* Tiêu đề sách nằm trong khung */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center p-2 rounded-b-[30px]">
          <p className="vsm:text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] vlg:text-[16px]">
            {title}
          </p>
        </div>
      </div>

      {/* Nút yêu thích */}
      <button 
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/40 rounded-lg border border-white/30"
        onClick={onFavouriteClick}
      >
        <FaHeart className={`icon-btn transition-colors duration-300 ${isFavourite ? "text-red-500" : "text-white"}`} />
      </button> 

    </div>
  );
}

export default BookCard;
