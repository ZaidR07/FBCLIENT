"use client";

import Header from "@/app/components/Header";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { RupeeIcon, RulerIcon, HomeIcon } from "@/app/Icons";
import { toast } from "react-toastify";

const FillHeartIcon = ({ property_id, removeFromWishlist }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      fill="#FF0000"
      viewBox="0 0 512 512"
      className="absolute right-4 top-4"
      onClick={() => removeFromWishlist(property_id)}
    >
      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>
  );
};

const PageContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(true);
  const [propertylist, setPropertylist] = useState([]);
  const [windowwidth, setWindowWidth] = useState(0);

  const loaddata = useCallback(async () => {
    if (!email) return;

    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/getwishlist`, {
        params: { email: email },
      });

      setPropertylist(
        response.data.payload.length > 0 ? response.data.payload : []
      );
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const removeFromWishlist = async (property_id) => {
    try {
      if (!property_id) {
        alert("something Went Wrong");
        return;
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URI}/removewishlist`, {
        property_id: property_id,
        email: email,
      });

      if (response.status != 200) {
        toast.error(response.data.message);
        return;
      }

      toast.success(response.data.message);
      setPropertylist(
        propertylist.filter((item) => item.property_id != property_id)
      );
    } catch {
      toast.error("something Went Wrong");
    }
  };

  return (
    <div className="bg-gray-100 mt-[8vh] lg:mt-[14vh] lg:pt-[5vh] min-h-screen">
      <Header />

      <div className="px-[10%] py-[5vh] flex flex-col gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : propertylist?.length > 0 ? (
          propertylist.map((item, index) => (
            <div
              className="w-full border-2  border-gray-300 shadow-md rounded-xl flex items-center gap-[4%] justify-between px-[2.5%] pb-4 pt-3 bg-white relative"
              key={index}
            >
              <FillHeartIcon
                removeFromWishlist={removeFromWishlist}
                property_id={item.property_id}
              />
              <div className="w-[35%] h-full bg-yellow-300 rounded-xl">
                <img
                  src={item.images[0]}
                  className="h-[15vh] lg:h-[40vh] w-[100%]   object-cover"
                  alt=""
                />
              </div>
              <div className="w-[57%] relative lg:flex lg:gap-2 lg:flex-col">
                <span className="text-lg block lg:text-2xl xl:text-3xl">
                  {item.Societyname}
                </span>

                <span className="text-gray-500 lg:text-xl">{item.address}</span>
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

                <div className="mt-1">
                  <span>Highlights:</span>
                  {Array.isArray(item.highlights) &&
                  item.highlights.length > 0 ? (
                    item.highlights.map((highlight, index) => (
                      <div key={index}>
                        <span>{highlight}</span>
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
          <div>Nothing Found</div>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
