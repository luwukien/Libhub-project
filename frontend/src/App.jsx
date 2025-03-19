import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/User/Account";
import Category from "./pages/Book/Category";
import About from "./pages/About/About";
import BookDetails from "./pages/BookDetails/BookDetails";
import Search from "./pages/Book/Search"
import BorrowedBooks from "./pages/Admin/BorrowedBooks";


const App = () => {

    return(
        <div>
          <Router>
            <Routes>
              <Route path="/" exact element={<Root/>} />
              <Route path="/home" exact element={<Home/>} />
              <Route path="/login" exact element={<Login/>} />
              <Route path="/signup" exact element={<SignUp/>} />
              <Route path="/account" exact element={<Account/>} />
              <Route path="/category" exact element={<Category/>} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/admin/borrowedbooks" element={<BorrowedBooks />} />
              <Route path="/about" element={<About/>} />
            </Routes>
          </Router>
        </div>
    )
}

const Root = () => {
  const isAuth = !!localStorage.getItem("token");
  return isAuth? (
    <Navigate to="/home"/>
  ):(
    <Navigate to="/home"/>
  )
}

export default App