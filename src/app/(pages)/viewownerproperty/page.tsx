"use client";

import Header from "@/app/components/Header";
import React, { useState } from "react";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { uri } from "@/constant";
import { RupeeIcon, HomeIcon, RulerIcon } from "@/app/Icons";

const page = () => {
  const [propertieslist, setPropertieslist] = useState([
    {
      Societyname: "",
      floor: "",
      bedrooms: "",
      area: "",
      areaunits: "",
      buildingfloors: "",
      address: "",
      amenities: [], // array of strings
      facing: "",
      propertyage: "",
      balconies: "",
      bathrooms: "",
      price: "",
      postedby: "",
      type: "",
      constructionstatus: "",
      furnishing: "",
      highlights: [], // array of strings
      location: "",
      line: "",
      for: "",
      property_id: null, // or 0 if you prefer default numeric
      active: false,
      images: [], // array of image URLs or objects
      postedby_id: null,
      postedbytype: null,
    },
  ]);

  const getData = useCallback(async () => {
    try {
      const propertyRes = await axios.get(`${uri}getproperties`);

      if (propertyRes.data.payload.length < 0) {
        console.error("Invalid response data");
        return;
      }

      setPropertieslist(propertyRes.data.payload);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData()]);

  const [windowwidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // This code only runs on the client side
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <Header />
      {/* Properties List */}
      <section className=" px-[5%] ] py-5 flex flex-col gap-4">
        <div></div>
        {Array.isArray(propertieslist) && propertieslist.length > 0 ? (
          propertieslist.map((item, key) => (
            <div
              className="w-full border-2  border-gray-300 shadow-md rounded-xl flex items-center gap-[4%] justify-between px-[2.5%] pb-4 pt-3 bg-white"
              key={key}
            >
              <div className="w-[35%] h-full bg-yellow-300 rounded-xl">
                <img
                  src={item.images[0]}
                  className="h-[15vh] lg:h-[40vh] w-[100%]   object-coverr"
                  alt=""
                />
              </div>
              <div className="w-[57%] relative lg:flex lg:gap-2 lg:flex-col">
                <span className="text-lg block lg:text-2xl xl:text-3xl">
                  {item.Societyname}
                </span>

                <span className="text-gray-500 lg:text-xl">
                  {item.location}
                </span>
                <div className="mt-1 flex gap-3 lg:gap-6">
                  <div className="flex gap-1 lg:gap-2">
                    <RulerIcon
                      width={windowwidth < 800 ? 12 : 25}
                      fill="#FF5D00"
                    />
                    <span className="text-sm lg:text-xl xl:text-2xl">
                      {item.area}
                    </span>
                    <span className="text-sm lg:text-xl xl:text-2xl">
                      {item.areaunits}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <HomeIcon
                      width={windowwidth < 800 ? 12 : 25}
                      fill="#FF5D00"
                    />
                    <span className="text-sm lg:text-xl xl:text-2xl">
                      {item.bedrooms || "NA"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <RupeeIcon
                    width={windowwidth < 800 ? 12 : 20}
                    fill="#FF5D00"
                  />
                  <span className="text-sm lg:text-xl xl:text-2xl">
                    {item.price}
                  </span>
                </div>

                {/* Highlights Section */}
                <div className="mt-1 flex flex-wrap gap-1">
                  <span>Highlights :</span>
                  {Array.isArray(item.highlights) &&
                  item.highlights.length > 0 ? (
                    item.highlights.map((highlight, index) => (
                      <div key={index}>
                        <span className="text-sm">
                          {highlight}
                          {index !== item.highlights.length - 1 && ", "}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span>NA</span>
                  )}
                </div>

                <button className="mt-2 px-3 py-1 lg:py-2 bg-[#FF5D00] text-white rounded text-sm lg:max-w-[40%]">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No Data</div>
        )}
      </section>
    </div>
  );
};

export default page;
