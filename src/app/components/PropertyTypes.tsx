"use client";

import Image from "next/image";
import { useEffect } from "react";

const PropertyTypes = () => {
  useEffect(() => {}, []);

  return (
    <div className="mt-[6vh] px-[4%] overflow-x-auto flex gap-3 pb-2 scrollbar-hide">
      <div className="flex gap-4 w-max">
        {/* Card 1 */}
        <div className="bg-[#CCEFEA] pt-28 relative rounded-lg min-w-[180px]">
          <h1 className="absolute top-[6%] left-[8%] text-xl font-bold">
            Residential <br /> Apartments
          </h1>
          <span className="text-gray-600 absolute top-[30%] left-[8%] text-sm">
            8200 + Properties
          </span>
          <Image
            src="/ap2.webp"
            className="rounded-lg"
            width={180}
            height={300}
            alt="Apartment"
          />
        </div>

        {/* Card 2 */}
        <div className="bg-[#E3FBDA] pt-28 relative rounded-lg min-w-[180px]">
          <h1 className="absolute top-[6%] left-[8%] text-xl font-bold">
            Independent  <br /> / Builder Floors
          </h1>
          <span className="text-gray-600 absolute top-[30%] left-[8%] text-sm">
            6200 + Properties
          </span>
          <Image
            src="/builder.webp"
            className="rounded-lg"
            width={150}
            height={300}
            alt="Apartment"
          />
        </div>

        {/* Card 3 */}
        <div className="bg-[#FFEFCB] pt-28 relative rounded-lg min-w-[180px] max-w-[180px]">
          <h1 className="absolute top-[6%] left-[8%] text-xl font-bold">
            Independent <br /> Bungalow / Villa
          </h1>
          <span className="text-gray-600 absolute top-[30%] left-[8%] text-sm">
            5000 + Properties
          </span>
          <Image
            src="/villa.webp"
            className="rounded-lg ml-1"
            width={200}
            height={300}
            alt="Apartment"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyTypes;
