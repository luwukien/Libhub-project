import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import useLogout from '../../utils/useLogout';
const ProfileInfo = ({ userInfo }) => {

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const logout = useLogout();
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

  return (
    <div className="z-50" ref={dropdownRef}>
      <button onClick={handleDropdownToggle} className=''>
        <img className="w-[52px] h-[52px] p-1 rounded-full object-cover translate-y-1 " src="public/default-avatar.jpg" alt="avatar-user" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 shadow-lg top-0 rounded-lg bg-gray-150"
          >
            <button className="block px-4 py-3 w-full text-left text-sm text-black hover:bg-pornhub-300 hover:rounded-lg" onClick={() => { navigate("/account") }}>View Profile</button>
            <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-pornhub-300 cursor-pointer hover:rounded-lg" onClick={(e) => {
              e.stopPropagation();
              logout();
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