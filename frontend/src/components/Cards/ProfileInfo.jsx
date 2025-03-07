import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

const ProfileInfo = ({ userInfo }) => {

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/home");
  }

  return (
    <div className="z-50" ref={dropdownRef}>
      <button onClick={handleDropdownToggle} className=''>
        <img className="w-[52px] h-[52px] p-1 rounded-full object-cover translate-y-1 " src="public/default-avatar.jpg" alt="avatar-user" />
      </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-1/2 shadow-lg top-0 z-100 rounded-lg"
            >
              <button className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => {navigate("/account")}}>View Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}>
                Logout
              </button>
              </motion.div>
            </div>
          )}
        </div>
    )
}

export default ProfileInfo