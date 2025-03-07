import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdAdd, MdUpdate, MdDeleteOutline } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";

const ViewBook = ({bookInfo, onClose, onEditClick, onDeleteClick}) => {
  return (
    <div className="relative">
      <div className="flex items-center justufy-end">
          <div className="absolute top-0 right-0">
              <div className=" flex items-center gap-2 bg-white p-2 rounded-l-lg shadow-md">            
                  <button className="btn-small" onClick={onEditClick}>
                    <MdUpdate className="text-lg"/> EDIT BOOK
                  </button> 
                         
                  <button className="btn-small btn-delete" onClick={onDeleteClick}>
                    <MdDeleteOutline className="text-lg"/> DELETE BOOK
                  </button> 
                  <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
                    <MdClose className="text-xl text-gray-500 hover:text-pornhub-200" />
                 </button>
              </div>
          </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {bookInfo && bookInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {bookInfo && moment(bookInfo.date).format("Do MMM YYYY")}  
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-yellow-600 bg-pornhub-200/30 rounded px-2 py-1">
              <TfiAgenda className="text-sm" />
              {bookInfo && bookInfo.category.map((item, index) => 
                bookInfo.category.length == index+1 ? 
                `${item}` : 
                `${item}, `
                )}
            </div>
          </div>

        </div>
        <img
          src={bookInfo && bookInfo.imageUrl}
          alt="Selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
            <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">{bookInfo.story}</p>
        </div>

      </div>
    </div>
  )
}

export default ViewBook