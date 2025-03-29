import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import BookCard from "../../components/Cards/BookCard";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md"
import Modal from 'react-modal';
import AddEditBook from "./AddEditBook";
import { ToastContainer, toast } from 'react-toastify'; 
import "./styles.css";
import ViewBook from "./ViewBook";
import Pagination from "../../components/CategoryElement/Pagination";
import { getCookie } from "../../utils/getCookie";
import BookBox from "../../components/CategoryElement/BookBox";
import "./styles.css";

const SearchResult = ({ userInfo, getUserInfo }) => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState("");
  const query = queryParams.get("q");
  const [filterType, setFilterType] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openAddEditModal, setOpenAddEditModal] = useState({
            isShown: false,
            type:"add",
            data:null,
  });
    
  const [openViewModal, setOpenViewModal] = useState({
          isShown: false,
          data: null,
  });

  const getAllBooks = async () => {
    try{
        const response = await axiosInstance.get("/get-all-book");
        if(response.data && response.data.stories){
            setAllBooks(response.data.stories);
            setTotalPages(response.data.totalPages || 1);
        }
    }catch(error){
        console.log("An unexpected error occurred. Please try again");
    }
}

    const handleClearSearch = () => {
        setFilterType("");
        getAllBooks();
    }

    const handleEdit = (data) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: data});
    };
    const handleViewBook = (data) => {
      setOpenViewModal({isShown: true, data});
    };

    const deleteBook = async (data) => {
      const bookId = data._id;

      try{
          const response = await axiosInstance.delete("/delete-book/" + bookId);
          console.log(response.data);
          if(response.data && response.data.error){
              toast.error("Book deleted successfully!", {
                  autoClose: 1000,
                });
              setOpenViewModal((prevState) => ({ ...prevState, isShown : false}));
              getAllBooks();
          }
      }catch(error){
          setError("An unexpected error occurred.Please try again!")
        }
  }

  const fetchSearchResults = async (currentPage) => {
    try {
      const response = await axiosInstance.get("/search", { params: { 
        query, 
        page: currentPage,
        limit: 16,
        user: JSON.stringify(userInfo)
      }  });
      if (response.data && response.data.stories) {
        setAllBooks(response.data.stories);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const updateIsFavourite = async (bookData) => {
    const bookId = bookData._id;
    try {
        const response = await axiosInstance.put(`/update-is-favourite/${bookId}`);

        if (response.data && response.data.story) {
            toast.success("Update Successfully", {
                autoClose: 1000,
            });
            getAllBooks();
        }
    } catch (error) {
        console.log("An unexpected error occurred. Please try again.");
    }
};

  useEffect(() => {
    getUserInfo();
    if (query) {
      fetchSearchResults(currentPage);
    }
    
  }, [query, currentPage]);

  return (
    <>
    <main id="main" className="flex justify-center mb-10">
        <div className="flex justify-center mt-10 mb-10">
          <div className="inner-category basis-3/4 max-w-[60%] pl-4 pr-4 pb-8 mt-[30px] vsm:relative vsm:top-[88px] vsm:right-[60px] sm:static">
            <div className="inner-wrap c-container">
              <div>
                {allBooks.length > 0 ? (
                            <div className="list-book flex justify-center flex-row flex-wrap gap-[50px]">
                                {allBooks.map((item) => {
                                    return (
                                        <BookCard 
                                        key={item._id}
                                        imgUrl={item.imageUrl}
                                        title={item.title}
                                        story={item.story}
                                        author={item.author}
                                        date={item.date}
                                        remainingBook={item.remainingBook}
                                        isFavourite={item.isFavourite}
                                        onEdit={() => handleEdit(item)}
                                        onClick={() => 
                                          userInfo?.role === "admin" 
                                            ? handleViewBook(item) 
                                            : navigate(`/book/${item._id}`)
                                        }
                                        onFavouriteClick={() => updateIsFavourite(item)}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <>Empty Card Here</>
                        )}
              </div>
            </div>
          </div>
        </div>
      </main>

    <div className="flex justify-center mt-10 mb-10">
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
      <div>
            <Modal 
              isOpen={openAddEditModal.isShown}
              onRequestClose={() => {}}
              style={{
                  overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      zIndex: 999,
                  },
              }}
              appElement={document.getElementById("root")}
              className="model-box relative"
            >
            <AddEditBook
                type={openAddEditModal.type}
                bookInfo={openAddEditModal.data}
                onClose={() => {
                    setOpenAddEditModal({ isShown: false, type: "add", data: null});
                }}
                getAllBooks={getAllBooks} 
            />
            </Modal>
        
        <Modal 
              isOpen={openViewModal.isShown}
              onRequestClose={() => {}}
              style={{
                  overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      zIndex: 999,
                  },
              }}
              appElement={document.getElementById("root")}
              className="model-box relative"
            >
              <ViewBook 
                bookInfo={openViewModal.data || null}
                userInfo={userInfo}
                onClose={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                }}
                onEditClick={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                    handleEdit(openViewModal.data || null);
                }}
                onDeleteClick={() => {
                    deleteBook(openViewModal.data || null);
                    
                }}
                isAdmin={userInfo?.role === "admin"}
              />
            </Modal>
            
            {userInfo?.role === "admin" && (
            <button
                className="w-16 h-16 flex items-center justify-center rounded-full bg-black hover:bg-pornhub-200 fixed right-10 bottom-10"
                onClick={() => {
                setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>
            )}
        
        <ToastContainer />
        </div>
      <Footer />
    </>
  );
};

export default SearchResult;
