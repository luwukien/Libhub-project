import React, { useState, useEffect, useRef } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../Input/SearchBar";


const Header = ({ userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch

 }) => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
  if (searchQuery.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  }
};

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };


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
  };

  const FlyoutLink = ({ children, href, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = FlyoutContent && open;

    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit z-50"
      >
        <a href="/category" className="ct-top-menu-item flex items-center group">
          {children}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 ml-2 transform transition-transform duration-300 group-hover:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <span
            style={{
              transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </a>
        <AnimatePresence>
          {showFlyout && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-1/2 top-12 z-50"
            >
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <FlyoutContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const CategoryContent = () => {
    return (
      <div className="h-auto w-[250px] bg-white shadow-xl font-NunitoSans rounded-md z-50">
        <ul className="font-normal text-base">
          <li className="ct-flyout-menu"><a href="#">Technology Books</a></li>
          <li className="ct-flyout-menu"><a href="#">Economy Books</a></li>
          <li className="ct-flyout-menu"><a href="#">History Books</a></li>
          <li className="ct-flyout-menu"><a href="#">Language Books</a></li>
          <li className="ct-flyout-menu"><a href="#">Psychology Books</a></li>
          <li className="ct-flyout-menu"><a href="#">Philosophy Books</a></li>
        </ul>
      </div>
    );
  };

  return (
    <header className="font-KumbhSans">
      <nav
        className="flex justify-between items-center py-1 font-bold drop-shadow-sm bg-white h-[50px] z-50"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="lg:basis-1/6 lg:mx-auto">
          <a
            href="#"
            className="inline-flex items-center justify-center w-auto h-auto relative"
          >
            <img
              className="lg:w-36 md:w-32 w-28 lg:h-auto"
              src="public/Lib-hub.svg"
              alt="Logo-lib-hub"
              style={{
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          </a>
        </div>

        {/* Search Bar */}
        {isToken && (
        <>
          <SearchBar 
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </>
        )}

        {/* Menu */}
        <ul id="ct-top-menu" className="basis-1/2 sm:ml-2 lg:flex lg:justify-center lg:items-center lg:gap-12 text-base whitespace-nowrap ">
          <li><a className="ct-top-menu-item" href="/home">Home</a></li>
          <li><a className="ct-top-menu-item" href="#">About</a></li>
          <li>
            <FlyoutLink className="ct-top-menu-item" FlyoutContent={CategoryContent}>
              Category
            </FlyoutLink>
          </li>
          <li><a className="ct-top-menu-item" href="#">Contact Us</a></li>
          {isToken ? <ProfileInfo userInfo={userInfo} /> : (<button className="ct-top-menu-item" onClick={onLogin}>Login</button>)}
        </ul>
        <div className="lg:hidden flex items-center cursor-pointer px-3 sm:px-8 ml-auto">
          <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;
