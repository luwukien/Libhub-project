import React, { useEffect, useState } from "react";
import HotBookCard from "./HotBookCard";
import axiosInstance from "../../utils/axiosInstance";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { PrevArrow, NextArrow } from "../Arrow";

const HotBookSlider = () => {

  const [HotBooks, setHotBooks] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  //fetching data category
  const fetchData = async () => { 
    try {
      const response = await axiosInstance.get("/get-all-book");
      setHotBooks(response.data.stories);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  //when fetching progress 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //setting for carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
    ]
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-transparent">
      <Slider {...settings}>
        {/* Render CardCategories from data */}
        {Array.isArray(HotBooks) && HotBooks.slice(0, Math.min(10, HotBooks.length)).map((book) => {
          return (
            <HotBookCard
            key={book._id} 
            title={book.title}
            imgUrl={book.imageUrl}
            onClick={() => navigate(`/book/${book._id}`)}
            />
          );
        })}
      </Slider> 
    </div>
  );
};

export default HotBookSlider;

