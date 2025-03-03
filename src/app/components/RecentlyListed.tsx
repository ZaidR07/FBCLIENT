import { uri } from "@/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { priceconverter } from "@/utils/priceconverter";

const RecentlyListed = () => {
  const [propertieslist, setPropertiesList] = useState([]);

  const handleload = async () => {
    const response = await axios.get(`${uri}getproperties`);

    console.log(response.data.payload);

    setPropertiesList(response.data.payload);
  };

  useEffect(() => {
    handleload();
  }, []);

  return (
    <div className="mt-[10vh] mx-2 py-6 text-xl px-[3%] gap-2 bg-[#fef6f0] shadow-inner rounded-2xl">
      <h1 className="text-[#FF5D00] text-center">Recently Listed</h1>

      {/* For Sale Section */}
      <h2 className="text-lg mt-6 ml-2">For Sale</h2>
      <div className="overflow-x-auto  whitespace-nowrap flex gap-3 pb-2 scrollbar-hide">
        {propertieslist.length > 0 &&
          propertieslist
            .filter((property) => property.for === "Sale")
            .map((property, index) => (
              <div
                key={index}
                className="bg-transparent min-w-[40%] px-2 py-2 relative rounded-lg border-t-[1px] border-[#fa9c66] shadow-md shadow-[#fa9c66]"
              >
                <div className="relative">
                  <img
                    src={
                      property.images && property.images.length > 0
                        ? property.images[0]
                        : "/rent.png"
                    }
                    alt="Property Image"
                    className="rounded-lg w-full h-[110px] object-cover"
                  />

                  <div className="absolute bottom-2 left-3 rounded-lg p-1 text-sm bg-orange-100 text-[#FF5D00]">
                    {priceconverter(property.price)}
                  </div>
                </div>
                <span className="text-xs">{property.bedrooms}</span>{" "}
                <span className="text-xs">{property.type}</span>{" "}
                <span className="text-xs text-wrap">
                  {property.floor} Floor
                </span>
                <br />
                <span className="text-xs block">
                  {property.Societyname
                    ? property.Societyname.length > 18
                      ? property.Societyname.substring(0, 18) + "..."
                      : property.Societyname
                    : "N/A"}
                </span>
                <span className="text-xs block">{property.location}</span>
              </div>
            ))}
      </div>

      {/* For Rent Section */}
      <h2 className="text-lg mt-2 ml-2">For Rent</h2>
      <div className="overflow-x-auto  whitespace-nowrap flex gap-3 pb-2 scrollbar-hide">
        {propertieslist.length > 0 &&
          propertieslist
            .filter((property) => property.for === "Sale")
            .map((property, index) => (
              <div
                key={index}
                className="bg-transparent min-w-[40%] px-2 py-2 relative rounded-lg border-t-[1px] border-[#fa9c66] shadow-md shadow-[#fa9c66]"
              >
                <div className="relative">
                  <img
                    src="/rent.png"
                    alt="Property Image"
                    className="rounded-lg w-full h-[110px] object-cover"
                  />
                  <div className="absolute bottom-2 left-3 rounded-lg p-1 text-sm bg-orange-100 text-[#FF5D00]">
                    {priceconverter(property.price)}
                  </div>
                </div>
                <span className="text-xs">{property.bedrooms}</span>{" "}
                <span className="text-xs">{property.type}</span>{" "}
                <span className="text-xs text-wrap">
                  {property.floor} Floor
                </span>
                <br />
                <span className="text-xs block">
                  {property.Societyname
                    ? property.Societyname.length > 18
                      ? property.Societyname.substring(0, 18) + "..."
                      : property.Societyname
                    : "N/A"}
                </span>
                <span className="text-xs block">{property.location}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RecentlyListed;
