import React, { useEffect, useState } from "react";
import CardCategory from "./CardCategory/CardCategory";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = () => {

  // const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState([true]);
  // const [error, setError] = useState(null);

  // fetching data category
  // const fetchData = async () => { 
  //   try {
  //     const response = await axios.get("http://localhost:3000/categories");
  //     setCategories(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // fetchData(); 
  }, []);

  //when fetching progress 
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  //setting for carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="">
      <Slider {...settings}>
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
      </Slider> 
    </div>
  );
};

const categories = [  
  {
    id: 1,
    title: "Technology BookShelf",
    description: "Tủ sách công nghệ là tủ sách chứa những quyển sách công nghệ...",
    imageUrl: "/public/tech-category.jpg", 
    linkCategory: "http://localhost:5173/category"

  },
  {
    id: 2,
    title: "Science BookShelf",
    description: "Tủ sách khoa học là tủ sách chứa những quyển sách khoa học...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"

  },
  {
    id: 3,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"

  },
  {
    id: 4,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"
  },
  {
    id: 5,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"
  },
  {
    id: 6,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"
  },
  {
    id: 7,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"
  },
  {
    id: 8,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"
  },
  {
    id: 9,
    title: "History BookShelf",
    description: "Tủ sách lịch sự là tủ sách chứa những quyển sách lịch sử...",
    imageUrl: "/public/tech-category.jpg",
    linkCategory: "http://localhost:5173/category"
  }
] 

export default CardSlider;

