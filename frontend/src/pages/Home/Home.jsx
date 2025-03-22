import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axiosInstance from "../../utils/axiosInstance";
import TextToggle from "../../components/TextToggle";
import GameCard from "../../components/Cards/GameCard";
import CardSlider from "../../components/Cards/CardSlider";
import { useSearch } from "../../utils/useSearch";  // Import the custom hook
import "../About/styles.css";
import Card from "../../components/Cards/Card";
import HotBookSlider from "../../components/Cards/HotBookSlider";


const Home = () => {
  const [items, setItems] = useState({ categories: [], hotBooks: [] });
  const [error, setError] = useState(null);
  // get Inforamation user
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
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
    try {
      const response = await axiosInstance.get("/get-all-book");
      if (response.data && response.data.stories) {
        setAllBooks(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  }

  const {
    searchQuery,
    setSearchQuery,
    onSearchBook,
    handleClearSearch,
  } = useSearch();
  
  useEffect(() => {
    fetchData();
    getAllBooks();
  }, []);

  return (
    <>
      <div className="content-wrapper font-NunitoSans">
        <header>
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchNote={onSearchBook}
            handleClearSearch={handleClearSearch}
          />
        </header>

          <div className="rounded-lg">
            <GameCard />
          </div>
        <main className="max-w-screen-xl mx-auto">

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
              <div className='flex justify-center items-center my-3 font-KumbhSans'>
                <a href="/about">
                  <button className='py-3 px-6 rounded-full text-black bg-pornhub-200 hover:bg-pornhub-300 font-semibold'>More details</button>
                </a>
              </div>
            </div>
          </div> {/*End about*/}

          <div className="bg-white">
            <div className="p-9">
              <div className="ct-subheadline">
                Categories
              </div>
              {/* Render CardCategories and CardSlider from data */}
              <CardSlider items={items.categories} Component={Card} type="category" />
            </div>
          </div>{/*End category-previous*/}

          <div className="bg-gray-100">
            <div className="p-9">
              <div className="ct-subheadline">
                Hot Books
              </div>
              {/* Render CardCategories and CardSlider from data */}
              <CardSlider items={items.hotBooks} Component={Card} />
            </div>
          </div> {/*End hot-book*/}

        </main> {/*End Body*/}

        <footer>
          <Footer />
        </footer>
      </div> {/* End content-wrapper */}

    </>
  )
}

export default Home