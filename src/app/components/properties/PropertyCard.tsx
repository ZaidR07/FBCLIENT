"use client";

import { RupeeIcon, HomeIcon, RulerIcon } from "@/app/Icons";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property: any;
  windowwidth: number;
}

export const PropertyCard = ({ property, windowwidth }: PropertyCardProps) => {
  const router = useRouter();

  return (
    <div className="w-full border-2  border-gray-300 shadow-md rounded-xl flex items-center gap-[4%] justify-between px-[2.5%] pb-4 pt-3 bg-white">
      <div className="w-[35%] h-full bg-yellow-300 rounded-xl">
        <img
          src={property.images[0]}
          className="h-[15vh] lg:h-[40vh] w-[100%]   object-cover"
          alt=""
        />
      </div>
      <div className="w-[57%] relative lg:flex lg:gap-2 lg:flex-col">
        <span className="text-lg block lg:text-2xl xl:text-3xl">
          {property.Societyname}
        </span>

        <span className="text-gray-500 lg:text-xl">
          {property.location}
        </span>
        <div className="mt-1 flex gap-3 lg:gap-6">
          <div className="flex gap-1 lg:gap-2">
            <RulerIcon
              width={windowwidth < 800 ? 12 : 25}
              fill="#FF5D00"
            />
            <span className="text-sm lg:text-xl xl:text-2xl">
              {property.area}
            </span>
            <span className="text-sm lg:text-xl xl:text-2xl">
              {property.areaunits}
            </span>
          </div>
          <div className="flex gap-1">
            <HomeIcon
              width={windowwidth < 800 ? 12 : 25}
              fill="#FF5D00"
            />
            <span className="text-sm lg:text-xl xl:text-2xl">
              {property.bedrooms || "NA"}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <RupeeIcon
            width={windowwidth < 800 ? 12 : 20}
            fill="#FF5D00"
          />
          <span className="text-sm lg:text-xl xl:text-2xl">
            {property.price}
          </span>
        </div>

        {/* Highlights Section */}
        <div className="mt-1 flex flex-wrap gap-1">
          <span>Highlights :</span>
          {Array.isArray(property.highlights) &&
          property.highlights.length > 0 ? (
            property.highlights.map((highlight, index) => (
              <div key={index}>
                <span className="text-sm">
                  {highlight}
                  {index !== property.highlights.length - 1 && ", "}
                </span>
              </div>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>

        <button
          onClick={() =>
            router.push(`/singleproperty?id=${property.property_id}`)
          }
          className="mt-2 px-3 py-1 lg:py-2 bg-[#FF5D00] text-white rounded text-sm lg:max-w-[40%]"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
