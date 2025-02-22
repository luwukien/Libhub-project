import React, { useState, useEffect, useRef } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isToken = localStorage.getItem("token");
  const onLogin = () => {
    navigate("/login");
  }

  return (
    <nav className="flex items-center relative py-1 font-bold drop-shadow-sm bg-slate-50 h-[50px] font-KumbhSans justify-start gap-4 px-4 z-50">
      
      {/* Logo */}
      <div className="basis-auto lg:basis-auto">
        <a href="#" className="inline-flex items-center justify-center w-auto h-auto relative">
          <img className="w-36 lg:h-auto" src="public/Lib-hub.svg" alt="Logo-lib-hub" />
        </a>
      </div>

      {/* Search Bar */}
      <div className="input-field relative max-w-md w-full ml-4">
        <button className="icon-search absolute top-1/2 -translate-y-1/2 flex justify-center items-center h-full w-12 hover:text-pornhub-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Title book, author, ISBN, ..."
          className="w-full h-[40px] p-4 pl-12 rounded-full text-black focus:outline-none bg-gray-200 text-sm"
        />
      </div>

      {/* Menu */}
      <ul id="ct-top-menu" className="hidden lg:flex lg:justify-center lg:items-center lg:gap-12 ml-auto">
        <li><a className="ct-top-menu-item" href="/home">Home</a></li>
        <li><a className="ct-top-menu-item" href="#">About Us</a></li>
        <li><a className="ct-top-menu-item" href="/category">Category</a></li>
        <li><a className="ct-top-menu-item" href="#">Contact Us</a></li>
        
        {/* Avatar with Dropdown */}
        {isToken ? <ProfileInfo userInfo={userInfo}/> : (<button className="ct-top-menu-item" onClick={onLogin}>Login</button>)}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden flex items-center cursor-pointer px-3 sm:px-8 ml-auto">
        <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
