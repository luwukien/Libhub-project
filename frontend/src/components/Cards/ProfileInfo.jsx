import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({userInfo}) => {

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
          <button onClick={handleDropdownToggle}>
            <img className="w-11 h-11 p-1 rounded-full ring-2 ring-pornhub-200 drop-shadow-md hover:ring-pornhub-300 duration-300 hover:shadow-black translate-y-1 object-center" src="public/default-avatar.png" alt="avatar-user" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => {navigate("/account")}}>View Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}>
                Logout
              </button>
            </div>
          )}
        </div>
    )
}

export default ProfileInfo