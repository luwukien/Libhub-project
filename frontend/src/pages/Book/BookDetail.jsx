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
                    autoClose: 500,
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 ">
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center mb-4"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack className="text-xl mr-2" /> Back
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative">
            <img
              src={bookInfo.imageUrl}
              alt={bookInfo.title}
              className="w-35  h-30 sm:w-3/4 rounded-lg shadow-md object-cover"
            />
          
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{bookInfo.title}</h1>
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span>{moment(bookInfo.date).format("Do MMM YYYY")}</span>
              <div className="inline-flex items-center gap-2 text-yellow-600 bg-yellow-100 rounded px-2 py-1">
                <TfiAgenda className="text-sm" />
              
              </div>
            </div>
            <p className="mt-4 text-gray-700"> 
              <strong>Category: </strong> 
              {bookInfo?.category?.length > 0 ? bookInfo.category.map((category) => category).join(", ") : "None"}
            </p>
            <br />
            
            <div className="mt-2">
              <p className="text-sm text-gray-600"><strong>Author:</strong> {bookInfo.author ? `${bookInfo.author}` : "None"}</p>
              <p className="text-sm text-gray-600"> {bookInfo.story || "None"}</p>
              <p className="text-sm text-gray-600"><strong>Remaining Book:</strong> {bookInfo.remainingBook ? `${bookInfo.remainingBook}` : "None"}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-pornhub-300 text-semibold">
                Borrow!
              </button>
              <button
                className={`p-2 rounded-full border transition-colors duration-300 flex items-center justify-center w-10 h-10
                ${bookInfo.isFavourite ? "bg-red-500 text-white border-red-500 hover:bg-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                onClick={updateIsFavourite}
              >
                <FaHeart className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {userInfo?.role === "admin" && (
          <div className="mt-6 flex gap-3">
            <button className="btn-edit" onClick={() => navigate(`/edit-book/${id}`)}>Edit Book</button>
            <button className="btn-delete" onClick={() => deleteBook(bookInfo)}>Delete Book</button>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default BookDetail;