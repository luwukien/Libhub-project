//using Swiper 
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import CardCategory from "./CardCategory/CardCategory";
import axios from 'axios';

const CardSlider = () => {

  // fetching data category
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState([true]);
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

  useEffect(() => {
    fetchData(); 
  }, []);

  //when fetching progress loading
  if (loading) return <div>Loading...</div>;

  //when fetching progress errors
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SwiperSlide
        spaceBetween={10}
        slidesPerView={3}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}

      >

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
      </SwiperSlide>
    </>
  );
};

export default CardSlider;


