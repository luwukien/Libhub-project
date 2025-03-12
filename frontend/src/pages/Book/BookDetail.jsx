import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { MdArrowBack } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa6";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

const BookDetail = ({ userInfo }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState(null);

  const fetchBook = async () => {
    try {
       const response = await axiosInstance.get(`/get-book/${id}`);
        if (response.data && response.data.story) {
            setBookInfo(response.data.story);
          }
        } catch (error) {
          console.log("An unexpected error occurred. Please try again");
        }
  };

  const updateIsFavourite = async () => {
    try {
            const response = await axiosInstance.put(`/update-is-favourite/${id}`);
            
            if (response.data && response.data.story) {
                toast.success("Update Successfully", {
                    autoClose: 1000,
                  });
                  fetchBook();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
  };

  useEffect(() => {
    
    fetchBook();
  }, [id]);

  if (!bookInfo) return <p>Loading...</p>;

  return (
    <div className="">
      <Header />
      <button className="btn-back" onClick={() => navigate(-1)}>
        <MdArrowBack className="text-xl" /> Back
      </button>

      <h1 className="text-2xl font-bold">{bookInfo.title}</h1>

      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-500">
          {moment(bookInfo.date).format("Do MMM YYYY")}
        </span>

        <div className="inline-flex items-center gap-2 text-sm text-yellow-600 bg-yellow-100 rounded px-2 py-1">
          <TfiAgenda className="text-sm" />
          {bookInfo.category?.join(", ")}
        </div>
      </div>

      <img
        src={bookInfo.imageUrl}
        alt={bookInfo.title}
        className="w-full h-[300px] object-cover rounded-lg mt-4"
      />
      <button className="w-6 h-6 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-1 right-1"
              onClick={updateIsFavourite}
            >
              <FaHeart className={`icon-btn transition-colors duration-300 ${bookInfo.isFavourite ? "text-red-500" : "text-white"}`}
              />
            </button>

      <p className="mt-4 text-gray-700">{bookInfo.story}</p>

      {userInfo?.role === "admin" && (
        <div className="mt-6 flex gap-3">
          <button className="btn-edit" onClick={() => navigate(`/edit-book/${id}`)}>Edit Book</button>
          <button className="btn-delete" onClick={() => deleteBook(bookInfo)}>Delete Book</button>
        </div>
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default BookDetail;
