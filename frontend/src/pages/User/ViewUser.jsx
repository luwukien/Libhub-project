import moment from "moment";
import React from "react";
import { MdClose, MdUpdate, MdDeleteOutline } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";

const ViewUser = ({ onClose, onEditClick, userInfo }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div className="absolute top-0 right-0">
          <div className="flex items-center gap-2 bg-white p-2 rounded-l-lg shadow-md">
            
            
                <button className="btn-small" onClick={onEditClick}>
                  <MdUpdate className="text-lg" /> EDIT ACCOUNT
                </button>

            <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
              <MdClose className="text-xl text-gray-500 hover:text-pornhub-200" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">{userInfo?.fullName}</h1>
        </div>

        <img
          src={userInfo?.avatar}
          alt="Selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">MSSV</label>
          <textarea
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="MSSV"
           rows={1}
           value={userInfo.MSSV}
           />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">PHONE NUMBER</label>
          <textarea
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="Your Phone Number"
           rows={1}
           value={userInfo.phoneNumber}
           />
        </div>

      </div>
    </div>
  );
};

export default ViewUser;
