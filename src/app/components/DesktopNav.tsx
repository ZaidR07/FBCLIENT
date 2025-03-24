"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AngleDown } from "../Icons";
import { useRouter } from "next/navigation";
import Register from "./Register";
import axios from "axios";
import { uri } from "@/constant";

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

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${uri}getspecificvariable`, {
        params: { category: "propertytypelist" },
      });

      if (response.data.payload.length > 0) {
        setPropertytypelist(response.data.payload);
      } else {
        setPropertytypelist([]);
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

  return (
    <nav className="relative hidden w-full h-full lg:flex  items-center justify-evenly px-6">
      <ul className="flex gap-16 text-xl">
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
            className="flex absolute left-[8%] top-[18vh] bg-[#fff] w-[60%] shadow-lg rounded-lg"
            onMouseLeave={() => setBuydropopen(false)}
          >
            {/* Category List */}
            <ul className="w-1/3 text-lg border-r pl-12 py-12 rounded-t-lg rounded-b-lg bg-[#fae5d8]">
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
            <ul className="text-base text-gray-500 w-1/3 border-r pl-12 py-12">
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
            {/* Property Image */}
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
            className="flex absolute left-[8%] top-[18vh] bg-[#fff] w-[60%] shadow-lg rounded-lg"
            onMouseLeave={() => setRentdropopen(false)}
          >
            {/* Category List */}
            <ul className="w-1/3 text-lg border-r pl-12 py-12 rounded-t-lg rounded-b-lg bg-[#fae5d8]">
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
            <ul className="text-base text-gray-500 w-1/3 border-r pl-12 py-12">
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
                      className="cursor-pointer py-2 "
                    >
                      {item.name}
                    </li>
                  ))
              ) : (
                <li>No property types found</li>
              )}
            </ul>

            {/* Property Image */}
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
      <Image
        src="/Fb_logo.jpg"
        width={90}
        height={90}
        alt="logo"
        className="ml-20"
        onClick={() => router.push("/")}
      />
      <Register registeropen={registeropen} setRegisterOpen={setRegisterOpen} />
      <div className="flex gap-16 items-center">
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
        <button
          className="text-lg text-white px-6 py-2 bg-[#FF5D00] rounded-md"
          onClick={() => setRegisterOpen(true)}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default DesktopNav;
