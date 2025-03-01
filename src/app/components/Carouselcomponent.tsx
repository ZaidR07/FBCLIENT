"use client";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { uri } from "@/constant";

const CarouselComponent = ({ companyInfo }) => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    if (companyInfo?.carousel?.length > 0) {
      setCarouselImages(companyInfo.carousel);
    }
  }, [companyInfo]);

  if (carouselImages.length === 0) return null; // Prevent rendering empty carousel

  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      stopOnHover
      showIndicators={false}
      className=""
    >
      {carouselImages.map((item, index) => (
        <div
          key={index}
          className="rounded-md"
        >
          <img
            src={`${uri}${item}`}
            alt={`Slide ${index + 1}`}
          
           
            className="object-cover rounded-md"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
