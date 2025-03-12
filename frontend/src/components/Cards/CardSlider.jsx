  import React, { useRef } from "react";
  import Card from "./Card";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import { PrevArrow, NextArrow } from "../Arrow";
  const CardSlider = ({ items }) => {
    const sliderRef = useRef(null);

    //setting for carousel
    const settings = {  
      dots: true,
      infinite: true,
      speed: 900,
      slidesToShow: 3,
      slidesToScroll: 2,
      arrows: false,
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
            initialSlide: 0,
            infinite: true,
          }
        },
      ]
    };


    return (
      <div className="relative w-full max-w-7xl mx-auto mb-4 bg-transparent">
        <PrevArrow sliderRef={sliderRef}/>
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <Card
              key={index}
              variant={item.variant}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              linkCategory={item.linkCategory}
              // borrowedCount={item.borrowedCount}
              author={item.author}
              withHoverEffect={true}
            />
          ))}
        </Slider>
        <NextArrow sliderRef={sliderRef} />

      </div>
    );
  };

  export default CardSlider;

