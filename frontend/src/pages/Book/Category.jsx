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
import ViewBook from "./ViewBook";
import "./styles.css";
import Filter from "../../components/CategoryElement/Filter";
import SortFilter from "../../components/CategoryElement/SortFilter";
import Pagination from "../../components/CategoryElement/Pagination";
import { useMemo } from "react";

const Category = () => {


    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [allBooks, setAllBooks] = useState([]);

    const [filterType, setFilterType] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    const [openAddEditModal, setopenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [openViewModal, setOpenViewModal] = useState({
      isShown: false,
      data: null,
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState({
        title: "All",
    });
    const [filters, setFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const totalPages = 10;

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/home");
            }
        }
    };

    const getAllBooks = async () => {
        try {
            const response = await axiosInstance.get("/get-all-book");
            if (response.data && response.data.stories) {
                setAllBooks(response.data.stories);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
    }


    const handleEdit = (data) => {
        setopenAddEditModal({ isShown: true, type: "edit", data: data });
    };
    const handleViewBook = (data) => {
        setOpenViewModal({ isShown: true, data });
    };

    const deleteBook = async (data) => {
        const bookId = data._id;

        try {
            const response = await axiosInstance.delete("/delete-book/" + bookId);
            console.log(response.data);
            if (response.data && response.data.error) {
                toast.error("Book deleted successfully!", {
                    autoClose: 1000,
                });
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                getAllBooks();
            }
        } catch (error) {
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
    getUserInfo();
    getAllBooks();
    return () => {};
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setFilters(response.data.categories);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
    setLoading(false);
  }, []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isScreenInRange, setIsScreenInRange] = useState(
    window.innerWidth >= 100 && window.innerWidth <= 772
  );

  useEffect(() => {
    const handleResize = () => {
      setIsScreenInRange(window.innerWidth >= 100 && window.innerWidth <= 772);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredBooks = useMemo(() => {
    if (selectedCategory.title === "All") return allBooks;
    return allBooks.filter((book) =>
      book.category.some(cat => cat.toLowerCase() === selectedCategory.title.toLowerCase())
    );
  }, [allBooks, selectedCategory]);

  useEffect(() => {
    setSelectedCategory({ title: "All" });
  }, []);


  return ( 
    <>
      <header>
        <Header userInfo={userInfo} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchBook}
        handleClearSearch={handleClearSearch}/>
      </header>
      <main id="main">
        <div className="inner-wrap flex flex-row justify-center box-border pb-0">
          <div className="relative p-4">
            {isScreenInRange ? (
              <>
                {/* This is the filter button for mobile view */}
                <SortFilter onFilterClick={() => setIsFilterOpen(true)} />
                {isFilterOpen && (
                  <div className="fixed top-0 right-0 h-full w-full bg-white shadow-lg transition-transform duration-300 z-50 translate-x-0">
                    <button
                      className="p-4 text-red-500 font-bold"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Đóng
                    </button>
                    <div className="main-filter">
                      <h4 className="pt-4 pl-4 pr-4 pb-0 items-center">
                        <span className="text-2xl text-pornhub-200">Category</span>
                      </h4>
                      <div className="list-wrapper p-4 pt-2 block">
                        <ul className="list flex flex-wrap flex-col list-none m-0 p-0 border-none line-inherit">
                          {filters.map((filter) => (
                            <Filter
                              key={filter.id}
                              id={filter.id}
                              title={filter.title}
                              selectedCategory={selectedCategory}
                              setSelectedCategory={setSelectedCategory}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="inner-filter inline-block basis-1/4 max-w-fit col-auto border-list rounded-filter pl-4 pr-4 pb-8 mt-5 mb-10 max-h-fit sticky top-10">
                <div className="main-filter">
                  <h4 className="pt-4 pl-4 pr-4 pb-0 items-center">
                    <span className="text-2xl text-porn-hub-200">Category</span>
                  </h4>
                  {/* // This is the filter for desktop view */}
                  <div className="list-wrapper p-4 pt-2 block">
                    <ul className="list flex flex-wrap flex-col list-none m-0 p-0 border-none line-inherit">
                      {filters.map((filter) => (
                        <Filter
                          key={filter._id}
                          id={filter._id}
                          title={filter.title}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="inner-category basis-3/4 max-w-[75%] pl-4 pr-4 pb-8">
            <div className="inner-des relative mb">
              <div className=" flex flex-row justify-between w-full">
                <div className="max-h-full flex flex-row items-center font-text">
                  <div className="sort-dropdown m-7">
                    <form className="my-1.25 mx-0 w-[300px]" method="get">
                      <select
                        name="orderby"
                        className="orderby rounded-[40px] border border-amber-100 w-full text-center"
                        aria-label="Yêu cầu thuê sách"
                      >
                        <option value="alphabet" selected="selected">
                          Thứ tự từ A-Z
                        </option>
                        <option value="alphabet-2">Thứ tự từ Z-A</option>
                      </select>
                      <input type="hidden" name="paged" defaultValue={1} />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="inner-wrap c-container">
              <div className="list-book flex flex-row flex-wrap gap-[50px]">
                {allBooks.length > 0 ? (
                            <div className="grid grid-cols-8 gap-8">
                                {filteredBooks.map((item) => {
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
                        ) : (
                            <>Empty Card Here</>
                        )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div>
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
};

export default Category;
