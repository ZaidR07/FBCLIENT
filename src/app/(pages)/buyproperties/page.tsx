"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import Header from "@/app/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { uri } from "@/constant";
import { useCallback } from "react";
import QueryParamsHandler from "@/app/components/SearchParameters";

const RupeeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={12}
      fill="#FF5D00"
    >
      <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" />
    </svg>
  );
};

const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width={20}
      fill="#FF5D00"
    >
      <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </svg>
  );
};

const RulerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={20}
      fill="#FF5D00"
    >
      <path d="M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0L17.9 401.9c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 50.7-50.7c18.7-18.7 49.1-18.7 67.9 0l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9L177.9 494.1z" />
    </svg>
  );
};

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    fill="#aaa"
    viewBox="0 0 512 512"
    className="absolute left-3 top-1/2 transform -translate-y-1/2"
  >
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
);

const AngleDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      fill="#000"
      viewBox="0 0 448 512"
    >
      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
    </svg>
  );
};

const FilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      fill="#f3701f"
      viewBox="0 0 512 512"
    >
      <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
    </svg>
  );
};

const SortIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      fill="#f3701f"
      viewBox="0 0 512 512"
    >
      <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
    </svg>
  );
};

const Dropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="border-2 border-gray-300 bg-white rounded-lg px-2 py-2 min-w-[15%] text-left text-gray-700 focus:ring-2 focus:ring-[#f3701f] flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || label}
        <span className="ml-2">▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute min-w-[100%] bg-white border-2 border-gray-300 mt-1 rounded-lg shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option) => (
              <li
                key={option}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page = () => {
  const placeholders = useMemo(
    () => ["Enter Location...", "Enter Pincode...", "Enter Project..."],
    []
  );

  const [type, setType] = useState("");
  const [view, setView] = useState("");

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [buyRentValue, setBuyRentValue] = useState("Buy");
  const [bhkValue, setBhkValue] = useState("Bedrooms");
  const [propertyValue, setPropertyValue] = useState("Property Type");
  const [constructionstatusvalues, setConstructionStatusValues] = useState([]);
  const [postedbyValues, setPostedbyValues] = useState([]);
  const [amenitiesvalues, setAmenitiesValues] = useState([]);

  const [range, setRange] = useState([100, 500]); // Default min-max values

  const [propertiesList, setPropertiesList] = useState([]);
  const [originalpropertiesList, setOriginalPropertiesList] = useState([]);

  const [filteropen, setFilterOpen] = useState(false);

  const [variables, setVariables] = useState({
    bhklist: [],
    propertytypelist: [],
    constructionstatuslist: [],
    postedbylist: [],
    amenitieslist: [],
  });

 
const getData = useCallback(async () => {
  try {
    // Fetch properties and variables data in parallel
    const [propertyRes, variableRes] = await Promise.all([
      axios.get(`${uri}getproperties`),
      axios.get(`${uri}getvariables`),
    ]);

    if (!propertyRes.data.payload || !variableRes.data.payload) {
      console.error("Invalid response data");
      return;
    }

    let filteredList = propertyRes.data.payload;

    // Filter by 'type' if it's not empty
    if (type != "") {
      filteredList = filteredList.filter((item) => item.type == type);
    }

    // Filter by 'view' if it's not null or empty
    if (view != "") {
      
      filteredList = filteredList.filter((item) => item.for == view);
    }

    // Update state
    setPropertiesList(filteredList);
    setOriginalPropertiesList(propertyRes.data.payload || []);
    setVariables(variableRes.data.payload);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}, []);


  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filterpropertylist = () => {
    let newlist = originalpropertiesList;

    if (bhkValue && bhkValue !== "Bedrooms") {
      newlist = newlist.filter((item) => item.bedrooms == bhkValue);
    }

    if (propertyValue && propertyValue !== "Property Type") {
      newlist = newlist.filter((item) => item.type == propertyValue);
    }

    if (constructionstatusvalues && constructionstatusvalues.length > 0) {
      newlist = newlist.filter((item) =>
        constructionstatusvalues.includes(item.constructionstatus)
      );
    }

    setPropertiesList(newlist);
  };

  useEffect(() => {
    filterpropertylist();
  }, [bhkValue, propertyValue, constructionstatusvalues]);

  return (
    <div className="bg-gray-100 mt-[8vh] min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <QueryParamsHandler
          onParams={({ type, view }) => {
            setType(type);
            setView(view);
          }}
        />
      </Suspense>
      <nav className="lg:hidden w-full h-[8vh] bg-[#f3701f] shadow-2xl flex items-center justify-between px-4">
        <div className="relative w-[60%]">
          <SearchIcon />
          <input
            className="border-2 border-gray-100 rounded-xl pl-10 pr-2 text-sm py-1 w-full outline-none"
            type="search"
            placeholder={placeholders[placeholderIndex]}
            aria-label="Search location or project"
          />
        </div>
        <button className="text-white text-xl font-bold">Sign Up</button>
      </nav>

      <section className="flex mt-[2vh] px-[5%] w-full gap-2">
        <Dropdown
          label="BHK"
          options={variables.bhklist || []}
          selected={bhkValue}
          onSelect={setBhkValue}
        />
        {type == "" && (
          <Dropdown
            label="Type"
            options={variables.propertytypelist || []}
            selected={propertyValue}
            onSelect={setPropertyValue}
          />
        )}
      </section>

      {/* Filter & Sort Buttons */}
      <div className="mt-[2vh] flex justify-between px-5">
        <button
          onClick={() => setFilterOpen(!filteropen)}
          className="border-[#f3701f] border-2 py-2 px-4 flex gap-2 rounded-xl"
        >
          <span className="text-[#f3701f]">Filter</span>
          <FilterIcon />
        </button>
        <button className="py-2 px-4 flex items-center gap-2 rounded-xl">
          <span className="text-[#f3701f]">Sort</span>
          <SortIcon />
        </button>
      </div>

      {/* Filter Sidebar  */}
      <div
        className={`w-[60%] min-h-[50vh] bg-[#fff] fixed rounded-2xl mt-[5vh] z-10 pl-[8%] py-5 border-2 border-[#f3701f] transition-transform duration-500 ease-in-out ${
          filteropen ? "translate-x-[-10%]" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex gap-3">
            <span className="font-semibold text-lg">Construction Status</span>

            <AngleDownIcon />
          </div>
          {variables.constructionstatuslist &&
            variables.constructionstatuslist.length > 0 &&
            variables.constructionstatuslist.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={constructionstatusvalues.includes(item)} // Check if item exists in state array
                  onChange={(e) => {
                    setConstructionStatusValues(
                      (prev) =>
                        prev.includes(item)
                          ? prev.filter((val) => val !== item) // Remove if already selected
                          : [...prev, item] // Add if not selected
                    );
                  }}
                />
                <span>{item}</span>
              </div>
            ))}
        </div>
        <div>
          <div className="flex gap-3">
            <span className="font-semibold text-lg">Posted by</span>

            <AngleDownIcon />
          </div>
          {variables.postedbylist &&
            variables.postedbylist.length > 0 &&
            variables.postedbylist.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={constructionstatusvalues.includes(item)} // Check if item exists in state array
                  onChange={(e) => {
                    setConstructionStatusValues(
                      (prev) =>
                        prev.includes(item)
                          ? prev.filter((val) => val !== item) // Remove if already selected
                          : [...prev, item] // Add if not selected
                    );
                  }}
                />
                <span>{item}</span>
              </div>
            ))}
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <span className="font-semibold text-lg">Area</span>
            <AngleDownIcon />
          </div>

          {/* Range Input */}
          <input
            type="range"
            min="0"
            max="10000"
            value={range[1]}
            className="w-full mt-2"
            onChange={(e) => setRange([range[0], Number(e.target.value)])}
          />

          {/* Min & Max Value Boxes */}
          <div className="flex justify-evenly items-center mt-2">
            <input
              type="number"
              value={range[0]}
              className="border p-2 w-16 text-center"
              onChange={(e) => setRange([Number(e.target.value), range[1]])}
            />

            <input
              type="number"
              value={range[1]}
              className="border p-2 w-16 text-center"
              onChange={(e) => setRange([range[0], Number(e.target.value)])}
            />
            <span>
              {propertiesList.length > 0 && propertiesList[0].areaunits}
            </span>
          </div>
        </div>
        <div>
          <div className="mt-4 flex gap-3">
            <span className="font-semibold text-lg">Amenities</span>

            <AngleDownIcon />
          </div>
          {variables.amenitieslist &&
            variables.amenitieslist.length > 0 &&
            variables.amenitieslist.map((item, index) => (
              <div className="flex gap-2">
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={amenitiesvalues.includes(item)} // Check if item exists in state array
                    onChange={(e) => {
                      setAmenitiesValues(
                        (prev) =>
                          prev.includes(item)
                            ? prev.filter((val) => val !== item) // Remove if already selected
                            : [...prev, item] // Add if not selected
                      );
                    }}
                  />
                  <span>{item}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Properties List */}
      <section className=" px-[5%] py-5 flex flex-col gap-4">
        {Array.isArray(propertiesList) && propertiesList.length > 0 ? (
          propertiesList.map((item, key) => (
            <div
              className="w-full border-2  border-gray-300 shadow-md rounded-xl flex items-center gap-[4%] justify-between px-[2.5%] pb-4 pt-3 bg-white"
              key={key}
            >
              <div className=" max-w-[35%] h-full bg-yellow-300 rounded-xl">
                <img src={item.images[0]} className="h-[15vh] min-w-[30vw] object-cover" alt="" />
              </div>
              <div className="w-[57%] relative">
                <span className="text-lg block">{item.Societyname}</span>

                <span className="text-gray-500">{item.address}</span>
                <div className="mt-1 flex gap-3">
                  <div className="flex gap-1">
                    <RulerIcon />
                    <span className="text-sm">{item.area}</span>
                    <span className="text-sm">{item.areaunits}</span>
                  </div>
                  <div className="flex gap-1">
                    <HomeIcon />
                    <span className="text-sm">{item.bedrooms}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <RupeeIcon />
                  <span className="text-sm">{item.price}</span>
                </div>
                {/* Highlights Section  */}
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

                <button className="mt-2 px-3 py-1 bg-[#FF5D00] text-white rounded text-sm">
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

export default Page;
