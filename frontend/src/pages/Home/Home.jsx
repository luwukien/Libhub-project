import React, { useEffect, useState } from "react";
import Footer from "../../components/layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";

const Home = () =>{

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/home");
            }
        }
    };
    useEffect(() => {
        getUserInfo();  
        return () => {
            
        }

        },[]
    )


const Home = () => {
  return <div className="h-24 w-64 bg-white p-6 shadow-xl"></div>
}
    return(
        <>
          <div className="content-wrapper">
            <header>
                  <Navbar userInfo={userInfo}/>
              </header>
      
              <main>
                <div className="">
                  Game
                </div> {/*End game*/}

                <div className="">
                  About-us
                </div> {/*End about-us*/}

                <div className="">
                  Category Previous
                </div> {/*End category-previous*/}

                <div className="">
                  Hot Book
                </div> {/*End hot-book*/}           

              </main> {/*End Body*/}

              {/* <Footer /> */}

          </div> {/* End content-wrapper */}
        </>
    )
}

export default Home