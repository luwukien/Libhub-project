import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Header from "../../components/layouts/Header";
import BookCard from "../../components/Cards/BookCard";
import { MdAdd } from "react-icons/md"
import Modal from 'react-modal';
import AddEditBook from "./AddEditBook";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "../../components/layouts/Footer";
import ViewBook from "../Home/ViewBook";    
import "./styles.css";

const Category = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [allBooks, setAllBooks] = useState([]);

    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [openAddEditModal, setopenAddEditModal] = useState({
        isShown: false,
        type:"add",
        data:null,
    });

    const [openViewModal, setOpenViewModal] = useState({
      isShown: false,
      data: null,
    });

    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/home");
            }
        }
    };

    const getAllBooks = async () => {
        try{
            const response = await axiosInstance.get("/get-all-book");
            if(response.data && response.data.stories){
                setAllBooks(response.data.stories);
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again");
        }
    }


    const handleEdit = (data) => {
        setopenAddEditModal({ isShown: true, type: "edit", data: data});
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

    const onSearchBook = async (query) => {
        try{
          const response = await axiosInstance.get("/search", {
            params:{
              query,
            },
          });
          if(response.data && response.data.stories){
            setFilterType("search");
            setAllBooks(response.data.stories);
          }
      }catch(error){
          setError("An unexpected error occurred.Please try again!")
        }
    }
  
    const handleClearSearch = () => {
        setFilterType("");
        getAllBooks();
    }

    useEffect(() => {
        getAllBooks();
        getUserInfo(); 
        return () => {
            
        }

        },[]
    )


  return ( 
    <>
        <Header className="absolute left-1/2 top-full -translate-x-1/2 w-[250px] bg-white shadow-xl rounded-md z-[100]" 
            userInfo={userInfo}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchNote={onSearchBook}
            handleClearSearch={handleClearSearch}
        />
              <div className="container mx-auto py-10">
                <div className="flex gap-7">
                    <div className="flex-1">
                        {allBooks.length > 0 ? (
                            <div className="grid grid-cols-8 gap-8">
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
                                        onClick={() => userInfo?.role === "admin" ? handleViewBook(item) : navigate(`/book/${item._id}`)}
                                        onFavouriteClick={() => updateIsFavourite(item)}
                                        />
                                    );
                                })}
                            </div>
                        ): (
                            <>Empty Card Here</>
                        )}
                    </div>
                </div>
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
                    setopenAddEditModal({ isShown: false, type: "add", data: null});
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
                setopenAddEditModal({ isShown: true, type: "add", data: null });
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
}

export default Category