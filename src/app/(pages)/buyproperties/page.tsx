"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import Header from "@/app/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { uri } from "@/constant";
import { useCallback } from "react";
import QueryParamsHandler from "@/app/components/SearchParameters";
import {
  RupeeIcon,
  HomeIcon,
  RulerIcon,
  SearchIcon,
  AngleDownIcon,
  FilterIcon,
  SortIcon,
} from "@/app/Icons";

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
  const [search, setSearch] = useState("");

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
    amenitieslist: [],
  });

  // Get query parameters on component mount and set state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setType(params.get("type") || "");
    setView(params.get("view") || "");
    setSearch(params.get("search") || "");
  }, []); // Runs once on mount

  // Jaro-Winkler Similarity function
  const jaroWinkler = (s1, s2) => {
    const m = [...s1].filter((c) => s2.includes(c)).length;
    if (m === 0) return 0;

    const transpositions =
      [...s1].reduce((acc, c, i) => acc + (c !== s2[i] ? 1 : 0), 0) / 2;
    const prefixLength = Math.min(
      4,
      [...s1].findIndex((c, i) => c !== s2[i]) + 1
    );

    const jaro = (m / s1.length + m / s2.length + (m - transpositions) / m) / 3;
    return jaro + prefixLength * 0.1 * (1 - jaro);
  };

  // Check if similarity score is 70% or more
  const isSimilar = (input, target) => {
    if (!input || !target) return false;
    input = input.toLowerCase();
    target = target.toLowerCase();
    const similarity = jaroWinkler(input, target) * 100; // Convert to percentage
    return similarity >= 70;
  };

  // Main function to fetch data
  const getData = useCallback(async () => {
    try {
      const [propertyRes, variableRes] = await Promise.all([
        axios.get(`${uri}getproperties`),
        axios.get(`${uri}getvariables`),
      ]);

      if (!propertyRes.data.payload || !variableRes.data.payload) {
        console.error("Invalid response data");
        return;
      }

      let filteredList = propertyRes.data.payload;

      if (type)
        filteredList = filteredList.filter((item) => item.type === type);
      if (view) filteredList = filteredList.filter((item) => item.for === view);

      if (search) {
        const searchLower = search.toLowerCase();

        filteredList = filteredList.filter((item) => {
          const location = item.location?.toLowerCase() || "";
          const societyName = item.Societyname?.toLowerCase() || "";

          // Matches if location OR society name has 70% similarity OR contains search query
          return (
            location.includes(searchLower) ||
            societyName.includes(searchLower) ||
            isSimilar(location, searchLower) ||
            isSimilar(societyName, searchLower)
          );
        });
      }

      setPropertiesList(filteredList);
      setOriginalPropertiesList(filteredList);
      setVariables(variableRes.data.payload);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [type, view, search]);

  useEffect(() => {
    if (type != "" || view != "" || search != "") {
      getData();
    }
  }, [type, view, search]); // Runs when type/view change

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

    // Filter by Amenities (ALL selected amenities must be present)
    if (amenitiesvalues && amenitiesvalues.length > 0) {
      newlist = newlist.filter((item) =>
        amenitiesvalues.every((amenity) => item.amenities.includes(amenity))
      );
    }
    setPropertiesList(newlist);
  };

  const handleFilter = () => {
    filterpropertylist();
  };

  const handleReset = () => {
    setBhkValue("Bedrooms");
    setPropertyValue("Property Type");
    setConstructionStatusValues([]);
    setAmenitiesValues([]);
    setRange([100, 500]);
    setPropertiesList(originalpropertiesList);
  };

  return (
    <div className="bg-gray-100 mt-[8vh] lg:mt-[14vh] lg:pt-[5vh] min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <QueryParamsHandler
          onParams={({ type, view, search }) => {
            setType(type);
            setView(view);
            setSearch(search);
          }}
        />
      </Suspense>
      <nav className="lg:hidden w-full h-[8vh] bg-[#f3701f] shadow-2xl flex items-center justify-between px-4">
        <div className="relative w-[60%]">
          <SearchIcon fill="#aaa" width={18} />
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
          <FilterIcon width={18} fill="#f3701f" />
        </button>
        <button className="py-2 px-4 flex items-center gap-2 rounded-xl">
          <span className="text-[#f3701f]">Sort</span>
          <SortIcon width={20} fill="#f3701f" />
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

            <AngleDownIcon width={20} fill="#000" />
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
          <div className="flex gap-3 items-center">
            <span className="font-semibold text-lg">Area</span>
            <AngleDownIcon width={20} fill="#000" />
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

        {/* // Amenities Section */}
        <div>
          <div className="mt-4 flex gap-3">
            <span className="font-semibold text-lg">Amenities</span>

            <AngleDownIcon width={20} fill="#000" />
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

        {/* Filter and Reset Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleReset}
            className="border-[#f3701f] border-2 py-2 px-4 rounded-xl text-[#f3701f]"
          >
            Reset
          </button>
          <button
            onClick={() => { handleFilter ; setFilterOpen(false)}}
            className="bg-[#f3701f] py-2 px-4 rounded-xl text-white"
          >
            Apply Filters
          </button>
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
                <img
                  src={item.images[0]}
                  className="h-[15vh] min-w-[30vw] object-cover"
                  alt=""
                />
              </div>
              <div className="w-[57%] relative">
                <span className="text-lg block">{item.Societyname}</span>

                <span className="text-gray-500">{item.address}</span>
                <div className="mt-1 flex gap-3">
                  <div className="flex gap-1">
                    <RulerIcon width={20} fill="#FF5D00" />
                    <span className="text-sm">{item.area}</span>
                    <span className="text-sm">{item.areaunits}</span>
                  </div>
                  <div className="flex gap-1">
                    <HomeIcon width={20} fill="#FF5D00" />
                    <span className="text-sm">{item.bedrooms}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <RupeeIcon width={12} fill="#FF5D00" />
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
