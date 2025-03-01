"use client";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
      
        <div
         
          className="rounded-md"
        >
          <img
            src="/1740719627292.png"
            className="object-cover rounded-md"
          />
        </div>

        <div
         
          className="rounded-md"
        >
          <img
            src="/1740719627309.png"
            className="object-cover rounded-md"
          />
        </div>

        <div
         
          className="rounded-md"
        >
          <img
            src="/1740719627319.jpeg"
            className="object-cover rounded-md"
          />
        </div>
      
    </Carousel>
  );
};

export default CarouselComponent;
