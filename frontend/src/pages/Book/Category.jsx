import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";
import BookCard from "../../components/Cards/BookCard";

const Category = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [allBooks, setAllBooks] = useState([]);

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
            console.log(response.data);
            if(response.data && response.data.stories){
                setAllBooks(response.data.stories);
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again");
        }
    }

    const handleEdit = (data) => {};
    const handleViewBook = (data) => {};
    const updateIsFavourite = async (bookData) => {};

    useEffect(() => {
        getAllBooks()
        getUserInfo();  
        return () => {
            
        }

        },[]
    )


  return (
    <>
        
        <Navbar userInfo={userInfo}/>
        
        <div className="container mx-auto py-10">
                <div className="flex gap-7">
                    <div className="flex-1">
                        {allBooks.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
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
                                        onClick={() => handleViewBook(item)}
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
    </>
  )
}

export default Category