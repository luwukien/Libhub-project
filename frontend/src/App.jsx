import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";

const App = () => {
    return(
        <div>
          <Router>
            <Routes>
              <Route path="/" exact element={<Root/>} />
              <Route path="/login" exact element={<Login/>} />
              <Route path="/signup" exact element={<SignUp/>} />
              <Route path="/home" exact element={<Home/>} />
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
    <Navigate to="/login"/>
  )
}

export default App