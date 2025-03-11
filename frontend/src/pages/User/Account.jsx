import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

const GetUser = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

    const [openAddEditModal, setopenAddEditModal] = useState({
        isShown: false,
        type:"add",
        data:null,
    });

    const [openViewModal, setOpenViewModal] = useState({
      isShown: false,
      data: null,
    });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/home");
      }
    }
  };

  const handleEdit = () => {
    setopenAddEditModal({ isShown: true, type: "edit", data: userInfo});
  };
  
  const handleViewUser = () => {
  setOpenViewModal({isShown: true});
  };

  useEffect(() => {
    getUserInfo();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false, 
      anchorPlacement: 'top-bottom', 
    });
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <header>
        <Navbar userInfo={userInfo} />
      </header>

      <main className="flex flex-col lg:flex-row items-start justify-center min-h-screen p-4 bg-gradient-to-r from-gray-100 to-gray-300" style={{ paddingTop: '80px' }}>
        {userInfo ? (
          <>
            <div className="flex flex-col space-y-4 w-full lg:w-2/3">
              
              <div className="bg-white rounded-lg shadow-lg" data-aos="fade-up" data-aos-once="false">
               
                <div className="relative" data-aos="fade-up" data-aos-once="false">
                  <img
                    src="https://placehold.co/1200x300"
                    alt="Library Cover Photo"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  
                  <div className="absolute -bottom-20 left-4 w-40 h-40 rounded-full bg-white border-4 border-white" data-aos="fade-up" data-aos-once="false">
                    <img
                      src={userInfo.avatar}
                      alt="User Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="pt-24 pb-6 px-4" data-aos="fade-up" data-aos-once="false">
                  <h2 className="text-gray-800 font-bold text-6xl text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {userInfo.name}
                  </h2>
                  <div className="mt-4 text-left space-y-2">
                    <p className="text-gray-800 font-bold text-4xl" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {userInfo.fullName}
                    </p>
                    <div className="flex items-center text-gray-600 text-lg">
                      <i className="fas fa-envelope mr-4 w-6"></i>
                      <span>{userInfo.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-lg">
                      <i className="fas fa-phone mr-4 w-6"></i>
                      <span>{userInfo.phoneNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-lg">
                      <i className="fas fa-info-circle mr-4 w-6"></i>
                      <span>{userInfo.bio || "Bio: Loving reading books"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg mt-4 p-6" data-aos="fade-up" data-aos-once="false" data-aos-anchor-placement="top-bottom">
                <h2 className="text-gray-800 font-bold text-xl">Recent Activities</h2>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Activity 1</li>
                  <li>Activity 2</li>
                  <li>Activity 3</li>
                  <li>Activity 4</li>
                </ul>
              </div>
            </div>
            
            <div className="w-full lg:w-1/5 bg-white rounded-lg shadow-lg mt-4 lg:mt-0 lg:ml-4 p-4" data-aos="fade-up" data-aos-once="false">
              <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2" onClick={toggleSettings}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${showSettings ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="space-y-4 mt-4">
                  <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-start space-x-2" onClick={() => handleNavigation('/change-password')}>
                    <i className="fas fa-key"></i>
                    <span>Change password</span>
                  </button>
                  <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-start space-x-2" onClick={() => handleNavigation('/book-in-borrowing')}>
                    <i className="fas fa-book"></i>
                    <span>Book in borrowing</span>
                  </button>
                  <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-start space-x-2" 
                    onEdit={() => handleEdit()}
                    onClick={() => handleViewUser()}
                  >
                    <i className="fas fa-cog"></i>
                    <span>Account Settings</span>
                  </button>
                  <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-start space-x-2" onClick={() => handleNavigation('/login')}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-lg">Loading user information...</p>
        )}
      </main>

      <div>
            <Modal 
              isOpen={openAddEditModal.isShown}
              onRequestClose={() => {}}
              style={{
                  overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      zIndex: 999,
                  },
              }}
              appElement={document.getElementById("root")}
              className="model-box relative"
            >
            <EditUser
                type={openAddEditModal.type}
                userInfo={userInfo}
                onClose={() => {
                    setopenAddEditModal({ isShown: false, type: "add", data: null});
                }}
                getUserInfo={getUserInfo} 
            />
            </Modal>
        
        <Modal 
              isOpen={openViewModal.isShown}
              onRequestClose={() => {}}
              style={{
                  overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      zIndex: 999,
                  },
              }}
              appElement={document.getElementById("root")}
              className="model-box relative"
            >
              <ViewUser 
                userInfo={userInfo}
                onClose={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                }}
                onEditClick={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                    handleEdit(openViewModal.data || null);
                }}
                
              />
            </Modal>
        
        <ToastContainer />  
        </div>

      <Footer />
    </>
  );
};

export default GetUser;