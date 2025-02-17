import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

const Login = () => {
    return(
      <div className='h-screen bg-black overflow-hidden relative'>
        <div className="container h-screen flex items-center justify-center px-20 mx-auto">
          <div className="">
            <div>

            </div>
          </div>

          <div className="w-2/4 h-[75vh] bg-white rounded-lg relative p-16 shadow-cyan-200/20">
            <form onSubmit={() => {}}>
              
              <h4 className="text-2xl font-semibold mb-7 text-yellow-500">Login</h4>
              
              <input type="text" placeholder="Email" className="input-box"/>
              
              <button type="submit" className="btn-primary text-yellow-500">
                LOGIN
              </button>

              <p className="text-yellow-500">Or</p>

              <button
                type="submit"
                className="text-yellow-500"
                onClick={() => {
                  navigate("/signup");
                }}
                >
                  CREAT ACCOUNT
                </button>

            </form>
          </div>
        </div>
      </div>
    )
}

export default Login