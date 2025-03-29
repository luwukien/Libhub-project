import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/User/Account";
import Category from "./pages/Book/Category";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Book/Search";
import { getCookie } from "./utils/getCookie";
import GameCard from "./components/Cards/GameCard"
import Header from "./components/layouts/Header";
import axiosInstance from "./utils/axiosInstance";
import Confession from "./pages/Confession/Confession";
import About from "./pages/About/About";
import BorrowedBooks from "./pages/Admin/BorrowedBooks";
import RouterHandler from "./utils/RouterHandler";

const App = () => {
    const [isToken, setIsToken] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    const [navigate, setNavigate] = useState("");

    const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        
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
        async function fetchToken() {
        const token = await getCookie("token"); 
        setIsToken(token); 
      }
      fetchToken();
    }, [isToken]);
    
    return (
        <div>
            <Router>
            {window.location.pathname !== "/login" && window.location.pathname !== "/signup" && (
                <Header
                    isToken={isToken}
                    setIsToken={setIsToken}
                    className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchNote={onSearchBook}
                    handleClearSearch={handleClearSearch}
                />
              )}
              
                <GameCard id="game-frame"/>
                <RouterHandler />
          
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={isToken ? <Navigate to="/home" replace /> : <Login setIsToken={setIsToken}/>} />
                    <Route path="/signup" element={ <SignUp setIsToken={setIsToken}/>} />
                    <Route path="/account" element={<Account userInfo={userInfo} getUserInfo={getUserInfo}/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/category/:title" element={<Category />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path="/search" element={<Search userInfo={userInfo} getUserInfo={getUserInfo}/>} />
                    <Route
                        path="/management"
                        element={userInfo?.role === "admin" ? <BorrowedBooks /> : <Navigate to="/home" replace />}
                      />
                    <Route path="/confession" element={<Confession isToken={isToken} userInfo={userInfo} getUserInfo={getUserInfo}/>} />
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