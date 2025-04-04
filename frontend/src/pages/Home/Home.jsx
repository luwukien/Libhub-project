import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axiosInstance from "../../utils/axiosInstance";
import GameCard from "../../components/Cards/GameCard";
import CardSlider from "../../components/Cards/CardSlider";
import { useSearch } from "../../utils/useSearch";  // Import the custom hook
import "../About/styles.css";
import { getCookie } from "../../utils/getCookie";

const Home = () => {

  const [items, setItems] = useState({ categories: [], hotBooks: [] });
  const [HotBooks, setHotBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isToken, setIsToken] = useState(null);
    // get Inforamation user
  const [loading, setLoading] = useState(true);

  // window.location.reload();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching categories from /home
        const response = await axiosInstance.get('/home');
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        }

        if (response.data && response.data.hotBooks) {
          setHotBooks(response.data.hotBooks);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
    async function fetchToken() {
            const token = await getCookie("token"); 
            setIsToken(token); 
          }
          fetchToken();
  }, []);

    return(
        <>
          <div className="content-wrapper font-NunitoSans">
            <header>
            </header>
      
              <main className="">
              <div className=""></div>

          <div className="bg-gray-100 h-auto w-full">
            <div className="p-5 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5 ">
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
            <div className="p-9 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="ct-subheadline">
                Categories
              </div>
              {/* Render CategoryCards from Card.jsx */}
              <CardSlider
                items={categories}
                variant="category"
                type="home"
                cardType="card"
                getKey={(item) => item.title} //return name category
              />
            </div>
          </div>{/*End category-previous*/}

          <div className="bg-gray-100">
            <div className="p-9 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="ct-subheadline">
                Hot Books
              </div>
              {/* Render HotBookCards from Card.jsx */}
              <CardSlider
                items={HotBooks}
                variant="hotbook"
                type="home"
                cardType="card"
                getKey={(item) => item._id} //return id bookDetails 
              />
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