import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/User/Account";
import Category from "./pages/Book/Category";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Book/Search";
import { getCookie } from "./utils/getCookie";
import BorrowedBooks from "./pages/Book/BorrowedBooks";
import GameCard from "./components/Cards/GameCard"
import Header from "./components/layouts/Header";
import axiosInstance from "./utils/axiosInstance";

const App = () => {
    const isToken = getCookie("token"); 
    const [searchQuery, setSearchQuery] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const [filterType, setFilterType] = useState('');

    // console.log(isToken);

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
    return (
        <div>
            <Router>
                <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchNote={onSearchBook}
                handleClearSearch={handleClearSearch}
                />
                <GameCard />
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={isToken ? <Navigate to="/home" replace /> : <Login />} />
                    <Route path="/signup" element={isToken ? <Navigate to="/home" replace /> : <SignUp />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/category/:title" element={<Category />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/borrowed" element={<BorrowedBooks />} />
                </Routes>
            </Router>
        </div>
    );
};

const Root = () => {
    return (
      <Navigate to="/home"/>
    )
  }

export default App;