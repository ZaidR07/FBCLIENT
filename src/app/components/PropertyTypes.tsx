"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PropertyTypes = () => {
  useEffect(() => {}, []);

  const [ imagewidth , setImagewidth ] = useState(180)

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImagewidth(180); // Mobile
      } else if (width < 1024) {
        setImagewidth(300); // Tablet
      } else {
        setImagewidth(400); // Large screens
      }
    };

    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight); // Update on resize

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  



  return (
    <div className="mt-[6vh] lg:mt-[10vh] px-[4%] overflow-x-auto  flex gap-3  pb-2 scrollbar-hide">
      <div className="flex gap-4 lg:gap-8 w-full ">
        {/* Card 1 */}
        <div className="bg-[#CCEFEA] pt-28 relative rounded-lg min-w-[180px] lg:flex-1">
          <h1 className="absolute top-[6%] left-[8%] text-xl md:text-2xl lg:text-3xl font-bold">
            Residential <br /> Apartments
          </h1>
          <span className="text-gray-600 absolute top-[30%] lg:top-[24%] lg:text-xl left-[8%] text-sm">
            8200 + Properties
          </span>
          <Image
            src="/ap2.webp"
            className="rounded-lg m-auto lg:mt-4"
            width={imagewidth}
            height={300}
            alt="Apartment"
          />
        </div>

        {/* Card 2 */}
        <div className="bg-[#E3FBDA] pt-28 relative rounded-lg min-w-[180px] lg:flex-1">
          <h1 className="absolute top-[6%] left-[8%] text-xl md:text-2xl lg:text-3xl font-bold">
            Independent  <br /> / Builder Floors
          </h1>
          <span className="text-gray-600 absolute top-[30%] lg:top-[24%] lg:text-xl left-[8%] text-sm">
            6200 + Properties
          </span>
          <Image
            src="/builder.webp"
            className="rounded-lg m-auto lg:mt-4"
            width={imagewidth * 0.8}
            height={300}
            alt="Apartment"
          />
        </div>

        {/* Card 3 */}
        <div className="bg-[#FFEFCB] pt-28 relative rounded-lg min-w-[180px] lg:flex-1">
          <h1 className="absolute top-[6%] left-[8%] text-xl md:text-2xl lg:text-3xl font-bold">
            Independent <br /> Bungalow / Villa
          </h1>
          <span className="text-gray-600 absolute top-[30%] lg:top-[24%] lg:text-xl left-[8%] text-sm">
            5000 + Properties
          </span>
          <Image
            src="/villa.webp"
            className="rounded-lg m-auto mt-4 lg:mt-12"
            width={imagewidth}
            height={300}
            alt="Apartment"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyTypes;
