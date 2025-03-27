import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const ViewPendingRequest = ({ onClose }) => {
  const [pending, setPending] = useState([]);

  const getPendingRequest = async () => {
    try {
      const response = await axiosInstance.get("/get-borrowed");
      if (response.data && response.data.pendingBorrowed) {
        setPending(response.data.pendingBorrowed);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again", error);
    }
  };

  const ReturnBook = async(data) => {
    const bookId = data._id;
    const userId = data.userId;
    try{
      const response = await axiosInstance.delete(`/delete-borrow/${bookId}/${userId}`);
      if (response.data && response.data.book) {
              toast.error("Book returned successfully!", {
              autoClose: 1000,
            });
          await getPendingRequest();
        }
    }catch(error){
      console.error("An unexpected error occurred. Please try again", error);
    }
  }

  const handleReturnBook = (data) => {
    if (window.confirm("Are you sure you want to decline the request?")) {
      ReturnBook(data);
    }
};

  const handleApprove = async (id) => {
    try{
        const response = await axiosInstance.put(`/approve-borrow-request/${id}`);
        if(response.data && response.data.borrowed){
            setPending(response.data.borrowed);
        }
    }catch(error){
        console.error("An unexpected error occurred. Please try again", error);
    }
  }

  useEffect(() => {
    getPendingRequest();
  }, []);

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-1 hover:bg-gray-200 rounded-full"
      >
        <MdClose className="text-xl text-gray-500 hover:text-red-500" />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Pending Requests
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="py-2 px-4 border-b">Book</th>
              <th className="py-2 px-4 border-b">Borrower</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {pending.length > 0 ? (
              pending.map((book) => (
                <tr key={book.bookId} className="border-b text-center">
                  {/* Book Column */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-12 h-12 object-cover rounded-md border border-gray-300"
                    />
                    <span className="text-gray-700">{book.title}</span>
                  </td>

                  {/* Borrower Name Column */}
                  <td className="py-3 px-4">{book.borrowName}</td>

                  {/* Start Date Column */}
                  <td className="py-3 px-4">{book.startDate}</td>

                  {/* End Date Column */}
                  <td className="py-3 px-4">{book.endDate}</td>

                  {/* Approve Button */}
                  <td className="py-3 px-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg"
                      onClick={() => handleApprove(book._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg mt-1"
                      onClick={() => handleReturnBook(book)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No pending requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPendingRequest;
