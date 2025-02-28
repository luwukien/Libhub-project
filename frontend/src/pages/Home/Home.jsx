import React, { useEffect, useState } from "react";
import Footer from "../../components/layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";
import TextToggle from "../../components/TextToggle";
import CardSlider from "../../components/CardSlider";


const Home = () =>{

    // get Inforamation user
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
      try{
        const response = await axiosInstance.get("/get-user");
        if(response.data && response.data.user) {
            setUserInfo(response.data.user);
        }
      } catch(error) {
          if (error.response.status === 401) {
              localStorage.clear();
              navigate("/home");
          }
        }
      };

    useEffect(() => {
      getUserInfo();  
      return () => {   
      };
      }, []);
      
    return(
        <>
          <div className="content-wrapper font-NunitoSans">
            <header>
                  <Navbar userInfo={userInfo}/>
              </header>
      
              <main className="">
                <div className="">
                  Game
                </div> {/*End game*/}

                <div className="bg-gray-100 h-auto">
                  <div className="p-5">
                    <div className="ct-subheadline">
                      About
                    </div>
                    <div className="flex w-11/12">
                      <div className="flex-1 w-40  font-extrabold text-5xl flex justify-center items-center tracking-wide">
                        What is <span className="text-pornhub-200 ml-2">Libhub?</span>
                      </div>
                      <div className="flex-1 w-64 font-medium">
                        <TextToggle />
                      </div>   
                    </div> 
                  </div> 
                </div> {/*End about*/}
                
                <div className="bg-white">
                  <div className="p-9">
                    <div className="ct-subheadline">
                      Categories
                    </div> 
                    <div className="flex flex-wrap justify-center gap-6">
                      {/* Render CardCategories and CardSlider from data */}
                      <CardSlider />
                    </div>
                  </div>
                </div>{/*End category-previous*/}


                <div className="">
                  Hot Book
                </div> {/*End hot-book*/}           

              </main> {/*End Body*/}

          </div> {/* End content-wrapper */}

          <Footer />
        </>
    )
}

export default Home