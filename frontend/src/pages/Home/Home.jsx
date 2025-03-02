import React, { useEffect, useState } from "react";
// import Footer from "../../components/layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import Header from "../../components/layouts/Header";
import TextToggle from "../../components/TextToggle";
import CardCategory from "../../components/Cards/CardCategory";
import axios from 'axios';
import GameCard from "../../components/Cards/GameCard";


const Home = () =>{
    // fetching data category
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

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
      fetchData();
      getUserInfo();  
        }, []);

        const [showGame, setShowGame] = useState(() => {
          return localStorage.getItem("unityGameVisible") === "true";
      });
  
      useEffect(() => {
          localStorage.setItem("unityGameVisible", "true"); // Khi vào HomePage, game sẽ hiển thị
      }, []);

    return(
        <>
          <div className="content-wrapper font-NunitoSans">
            <header>
                  <Header userInfo={userInfo}/>
              </header>
      
              <main className="">
                <div className="rounded-lg">
                {showGame && <GameCard />}
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
                    <div className="flex flex-wrap justify-center gap-6 min-h-screen">
                      {/* Render CardCategories from data */}
                      {categories.map((category, index) => {
                        return (
                          <CardCategory
                          key={index} 
                          title={category.title}
                          description={category.description}  
                          imageUrl={category.imageUrl}
                          linkCategory={category.linkCategory}
                          />
                        );

                      })}
                    </div>
                  </div>
                </div>{/*End category-previous*/}


                <div className="">
                  Hot Book
                </div> {/*End hot-book*/}           

              </main> {/*End Body*/}

          </div> {/* End content-wrapper */}

          {/* <Footer /> */}
        </>
    )
}

export default Home