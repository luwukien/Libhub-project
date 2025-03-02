import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { GameProvider } from "./utils/GameProvider";
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/Auth/Account";
import Category from "./pages/Book/Category";
import GameCard from "./components/Cards/GameCard";

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