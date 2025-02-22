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
    <div className="relative" ref={dropdownRef}>
          <button onClick={handleDropdownToggle}>
                <img className="w-10 h-10 p-1 rounded-full ring-2 ring-pornhub-200 drop-shadow-md hover:ring-pornhub-300 duration-300 hover:shadow-black translate-y-4"
        src="public/img/default-avatar.png" alt="avatar-user" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => {navigate("/account")}}>View Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}>
                Logout
              </button>

              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" onClick={() => {
                navigate("/signup");
              }}>
                SignUp
              </button>

            </div>
          )}
        </div>
    )
}

export default ProfileInfo