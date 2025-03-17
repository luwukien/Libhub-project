import React, { useEffect, useState } from "react";
import Footer from "../../components/layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import Header from "../../components/layouts/Header";
import TextToggle from "../../components/TextToggle";
import CardCategory from "../../components/Cards/CardCategory";
import axios from 'axios';
import GameCard from "../../components/Cards/GameCard";
import CardSlider from "../../components/Cards/CardSlider";
import HotBookSlider from "../../components/Cards/HotBookSlider";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
    // get Inforamation user
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    const [allBooks, setAllBooks] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


  // fetching data category
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.story);
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
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        
      }
    } catch (error) {
      if (error.response.status === 401) {
        
        rage.clear();
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
                  <GameCard />
                </div> 

          <div className="bg-gray-100 h-auto">
            <div className="p-5 " id='about'>
              <div className="ct-subheadline">
                What is the <span className="text-pornhub-200 ml-2 mr-2">Libhub</span> product?
              </div>
              <div className="flex items-center justify-center font-medium max-w-5xl mx-auto mb-3">
                <p className=''>
                  Libhub stands for Library Hub. This is an innovative improvement to the schools library system, designed to enhance students learning experience. It simplifies the search for academic resources, making it easier to find relevant materials. Libhub, simplifies resource searching and provides a virtual library simulation, making it easier for students to access and explore academic materials. We aim to optimize UI/UX to make the library more user-friendly and interesting.
                </p>
              </div>
              <TextToggle />
            </div>
          </div> {/*End about*/}

          <div className="bg-white">
            <div className="p-9">
              <div className="ct-subheadline">
                Categories
              </div>
              {/* Render CardCategories and CardSlider from data */}
              <CardSlider />
            </div>
          </div>{/*End category-previous*/}


          <div className="bg-gray-100">
            <div className="p-9">
              <div className="ct-subheadline">
                Hot Books
              </div>
              <HotBookSlider />
            </div>
          </div> {/*End hot-book*/}

        </main> {/*End Body*/}

      </div> {/* End content-wrapper */}

      <Footer />
    </>
  )
}

export default Home