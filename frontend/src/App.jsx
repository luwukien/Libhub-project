import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/User/Account";
import Category from "./pages/Book/Category";
import About from "./pages/About/About";
import BookDetails from "./pages/BookDetails/BookDetails";
import Search from "./pages/Book/Search";
import BorrowedBooks from "./pages/Admin/BorrowedBooks";
import { getCookie } from "./utils/getCookie";

// import BorrowedBooks from "./pages/Book/BorrowedBooks";

const App = () => {
    const isToken = getCookie("token"); 

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />

                    {/* Nếu đã đăng nhập, chuyển hướng từ /login và /signup về /home */}
                    <Route path="/login" element={isToken ? <Navigate to="/home" replace /> : <Login />} />
                    <Route path="/signup" element={isToken ? <Navigate to="/home" replace /> : <SignUp />} />

                    <Route path="/account" element={<Account />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/search" element={<Search />} />
                    {/* <Route path="/borrowed" element={<BorrowedBooks />} /> */}
                    <Route path="/about" element={<About/>} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;