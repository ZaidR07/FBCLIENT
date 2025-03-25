"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AngleDown } from "../Icons";
import { useRouter } from "next/navigation";
import Register from "./Register";
import axios from "axios";
import { uri } from "@/constant";
import Cookies from "js-cookie"; // Import js-cookie
import Profile from "./Profile";

const TrendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      fill="#6b7280"
      viewBox="0 0 576 512"
    >
      <path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z" />
    </svg>
  );
};

const DesktopNav = () => {
  const router = useRouter();
  const [registeropen, setRegisterOpen] = useState(false);
  const [buydropopen, setBuydropopen] = useState(false);
  const [rentdropopen, setRentdropopen] = useState(false); // State for Rent dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertytypelist, setPropertytypelist] = useState([]);
  const [currentcategory, setCurrentCategory] = useState(1);
  const [currentRentCategory, setCurrentRentCategory] = useState(1); // State for Rent category
  const [locationlist, setLocationlist] = useState([]);

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${uri}getspecificvariable`, {
        params: { category: "propertytypelist" },
      });

      const response2 = await axios.get(`${uri}getspecificvariable`, {
        params: { category: "locationlist" },
      });

      if (response.data.payload.length > 0) {
        setPropertytypelist(response.data.payload);
      } else {
        setPropertytypelist([]);
      }

      if (response2.data.payload.length > 0) {
        setLocationlist(response2.data.payload);
      } else {
        setLocationlist([]);
      }
    } catch (error) {
      setError("Failed to load property types");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  const [user, setUser] = useState(null); // State for user

  const userCookie = Cookies.get("user"); // Using js-cookie

  const getUserCookie = () => {
    

    if (userCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userCookie))); // Parse JSON safely
      } catch {
        setUser(userCookie); // Fallback if not JSON
      }
    }
  };

  // Extract user from cookies
  useEffect(() => {
    getUserCookie()
  }, [userCookie]);

  return (
    <nav className="relative hidden w-full h-full lg:flex  items-center  px-[5vw] ">
      <ul className="flex w-[35vw] gap-16 text-xl justify-end">
        {/* Buy Dropdown */}
        <li
          className="flex gap-2 cursor-pointer"
          onMouseEnter={() => {
            setBuydropopen(true);
            setRentdropopen(false);
          }}
        >
          <span>Buy</span>
          <AngleDown width={12} />
        </li>
        {buydropopen && !loading && (
          <div
            className={`flex absolute left-[8%] top-[18vh] bg-[#fff] ${
              currentcategory != 4 ? "w-[60%]" : "w-[40%]"
            }  shadow-lg rounded-lg`}
            onMouseLeave={() => setBuydropopen(false)}
          >
            {/* Category List */}
            <ul
              className={`${
                currentcategory != 4 ? "w-1/3" : "w-1/2"
              }  text-lg border-r pl-12 py-12 rounded-t-lg rounded-b-lg bg-[#fae5d8]`}
            >
              <li className="text-xl -mt-6 mb-2  -ml-4">Buying Options</li>
              <li
                className={`cursor-pointer  ${
                  currentcategory === 1 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentCategory(1)}
              >
                Residential
              </li>
              <li
                className={`cursor-pointer py-2  ${
                  currentcategory === 2 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentCategory(2)}
              >
                Commercial
              </li>
              <li
                className={`cursor-pointer py-2  ${
                  currentcategory === 3 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentCategory(3)}
              >
                Plots / Land
              </li>
              <li
                className={`cursor-pointer py-2  ${
                  currentcategory === 4 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentCategory(4)}
              >
                Trending Areas
              </li>
            </ul>

            {/* Property Type List */}
            {currentcategory != 4 ? (
              <ul
                className={`text-base text-gray-500 ${
                  currentcategory != 4 ? "w-1/3" : "w-1/2"
                }   border-r pl-12 py-12`}
              >
                {propertytypelist?.length > 0 ? (
                  propertytypelist
                    .filter((item) => item.category === currentcategory)
                    .map((item, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          router.push(
                            `/buyproperties?type=${item.name}&view=Sale`
                          )
                        }
                        className="cursor-pointer py-2 "
                      >
                        {item.name}
                      </li>
                    ))
                ) : (
                  <li>No property types found</li>
                )}
              </ul>
            ) : (
              <ul
                className={`text-base text-gray-500 ${
                  currentcategory != 4 ? "w-1/3" : "w-1/2"
                }   border-r pl-12 py-12`}
              >
                {locationlist?.length > 0 ? (
                  locationlist.map((item, index) => (
                    <div className="flex gap-2">
                      <li
                        key={index}
                        onClick={() =>
                          router.push(`/buyproperties?type=${item}&view=Sale`)
                        }
                        className="cursor-pointer py-2 "
                      >
                        {item}
                      </li>
                      <TrendIcon />
                    </div>
                  ))
                ) : (
                  <li>No Locations found</li>
                )}
              </ul>
            )}

            {/* Property Image */}
            {currentcategory != 4 && (
              <div className="w-1/3 flex items-center justify-center px-4">
                <img
                  src={
                    currentcategory === 1
                      ? "/Residential.jpg"
                      : currentcategory === 2
                      ? "/Commercial.jpg"
                      : currentcategory === 3
                      ? "/Land.jpg"
                      : "/Trending.jpg"
                  }
                  alt="property image"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Rent Dropdown */}
        <li
          className="flex gap-2 cursor-pointer"
          onMouseEnter={() => {
            setRentdropopen(true);
            setBuydropopen(false);
          }}
        >
          <span>Rent</span>
          <AngleDown width={12} />
        </li>
        {rentdropopen && !loading && (
          <div
            className={`flex absolute left-[8%] top-[18vh] bg-[#fff] ${
              currentRentCategory != 4 ? "w-[60%]" : "w-[40%]"
            }  shadow-lg rounded-lg`}
            onMouseLeave={() => setRentdropopen(false)}
          >
            {/* Category List */}
            <ul
              className={`${
                currentRentCategory != 4 ? "w-1/3" : "w-1/2"
              }  text-lg border-r pl-12 py-12 rounded-t-lg rounded-b-lg bg-[#fae5d8]`}
            >
              <li className="text-xl -mt-6 mb-2  -ml-4">Renting Options</li>
              <li
                className={`cursor-pointer  ${
                  currentRentCategory === 1 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentRentCategory(1)}
              >
                Residential
              </li>
              <li
                className={`cursor-pointer py-2  ${
                  currentRentCategory === 2 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentRentCategory(2)}
              >
                Commercial
              </li>
              <li
                className={`cursor-pointer py-2  ${
                  currentRentCategory === 3 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentRentCategory(3)}
              >
                Plots / Land
              </li>
              <li
                className={`cursor-pointer py-2  ${
                  currentRentCategory === 4 ? "text-[#FF5D00]" : ""
                }`}
                onClick={() => setCurrentRentCategory(4)}
              >
                Trending Areas
              </li>
            </ul>

            {/* Property Type List */}
            {currentRentCategory != 4 ? (
              <ul
                className={`text-base text-gray-500 ${
                  currentRentCategory != 4 ? "w-1/3" : "w-1/2"
                } border-r pl-12 py-12`}
              >
                {propertytypelist?.length > 0 ? (
                  propertytypelist
                    .filter((item) => item.category === currentRentCategory)
                    .map((item, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          router.push(
                            `/buyproperties?type=${item.name}&view=Rent`
                          )
                        }
                        className="cursor-pointer py-2"
                      >
                        {item.name}
                      </li>
                    ))
                ) : (
                  <li>No property types found</li>
                )}
              </ul>
            ) : (
              <ul
                className={`text-base text-gray-500 ${
                  currentRentCategory != 4 ? "w-1/3" : "w-1/2"
                } border-r pl-12 py-12`}
              >
                {locationlist?.length > 0 ? (
                  locationlist.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <li
                        onClick={() =>
                          router.push(`/buyproperties?type=${item}&view=Rent`)
                        }
                        className="cursor-pointer py-2"
                      >
                        {item}
                      </li>
                      <TrendIcon />
                    </div>
                  ))
                ) : (
                  <li>No Locations found</li>
                )}
              </ul>
            )}

            {/* Property Image */}
            {currentRentCategory != 4 && (
              <div className="w-1/3 flex items-center justify-center px-4">
                <img
                  src={
                    currentRentCategory === 1
                      ? "/Residential.jpg"
                      : currentRentCategory === 2
                      ? "/Commercial.jpg"
                      : currentRentCategory === 3
                      ? "/Land.jpg"
                      : "/Trending.jpg"
                  }
                  alt="property image"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        <li className="flex gap-2 cursor-pointer">
          <span>PG</span>
        </li>
        <li
          className="cursor-pointer"
          onClick={() => router.push("/brokerslist")}
        >
          Find an Agent
        </li>
      </ul>
      <div className="flex w-[10%] ml-[5vw] mr-[5vw] justify-center ">
        <Image
          src="/Fb_logo.jpg"
          width={90}
          height={90}
          alt="logo"
          className=""
          onClick={() => router.push("/")}
        />
      </div>

      <Register registeropen={registeropen} setRegisterOpen={setRegisterOpen} />
      <div className="flex gap-16 items-center w-[35vw]">
        <ul className="flex gap-16 text-xl">
          <li className="cursor-pointer" onClick={() => router.push("/")}>
            Home
          </li>
          <li className="cursor-pointer" onClick={() => router.push("/about")}>
            About us
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            Help
          </li>
        </ul>
        {user ? (
          <Profile user={user} />
        ) : (
          <button
            className="text-lg text-white px-6 py-2 bg-[#FF5D00] rounded-md"
            onClick={() => setRegisterOpen(true)}
          >
            Sign up
          </button>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
