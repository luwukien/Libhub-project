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
    // get Inforamation user
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);


    const [allBooks, setAllBooks] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    

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

    const getAllBooks = async () => {
      try{
          const response = await axiosInstance.get("/get-all-book");
          if(response.data && response.data.stories){
              setAllBooks(response.data.stories);
          }
      }catch(error){
          console.log("An unexpected error occurred. Please try again");
      }
    }

    const onSearchBook = async (query) => {
      try{
        const response = await axiosInstance.get("/search", {
          params:{
            query,
          },
        });
        if(response.data && response.data.stories){
          setFilterType("search");
          setAllBooks(response.data.stories);
        }
    }catch(error){
        setError("An unexpected error occurred.Please try again!")
      }
    }

    const handleClearSearch = () => {
    setFilterType("");
    getAllBooks();
    }

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
      getAllBooks();
        }, []);

    return(
        <>
          <div className="content-wrapper font-NunitoSans">
            <header>
              <Header 
                userInfo={userInfo} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchNote={onSearchBook}
                handleClearSearch={handleClearSearch}
              />  
            </header>
      
              <main className="">
                <div className="rounded-lg">
                  
                </div> 

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
                </div> 
                
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