"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import Header from "@/app/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { uri } from "@/constant";
import { useCallback } from "react";
import { QueryParamsHandler } from "@/app/components/SearchParameters";
import { useRouter } from "next/navigation";
import {
  RupeeIcon,
  HomeIcon,
  RulerIcon,
  SearchIcon,
  AngleDownIcon,
  FilterIcon,
 
} from "@/app/Icons";

import PropertiesNav from "@/app/components/PropertiesNav";

const AppliedFilters = ({ filters, onRemoveFilter }) => {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <h1 className="text-lg font-semibold">Applied Filters :</h1>
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-200 rounded-lg px-3 py-1 text-sm"
        >
          <span>
            <span className="text-orange-600">{filter.label} : </span>
            {filter.value}
          </span>
          <button
            onClick={() => onRemoveFilter(filter)}
            className="ml-2 text-red-600 md:text-base lg:text-lg hover:text-red-800"
          >
            ×
          </button>
        </div>
      ))}
    </div>
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
            className="absolute  bg-white border-2 border-gray-300 mt-1 rounded-lg shadow-lg z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option, index) =>
              label === "Type" ? (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    onSelect(option.name);
                    setIsOpen(false);
                  }}
                >
                  {option.name}
                </li>
              ) : (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const PriceDropdown = ({ onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0); // State for minimum price
  const [maxPrice, setMaxPrice] = useState(1000000000); // State for maximum price

  return (
    <div className="relative">
      <button
        className="border-2 border-gray-300 bg-white rounded-lg px-2 py-2 min-w-[15%] text-left text-gray-700 focus:ring-2 focus:ring-[#f3701f] flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        Price
        <span className="ml-2">▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute min-w-[200px] bg-white border-2 border-gray-300 mt-1 rounded-lg shadow-lg z-30 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-4">
              {/* Min Price Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="minPrice" className="text-sm font-medium">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="border p-2 rounded-lg"
                  placeholder="Min Price"
                />
              </div>

              {/* Max Price Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="maxPrice" className="text-sm font-medium">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="border p-2 rounded-lg"
                  placeholder="Max Price"
                />
              </div>

              {/* Apply Button */}
              <button
                onClick={() => {
                  onApply([minPrice, maxPrice]);
                  setIsOpen(false);
                }}
                className="bg-[#f3701f] text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
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

  const router = useRouter();

  const [type, setType] = useState("");
  const [view, setView] = useState("");
  const [search, setSearch] = useState("");

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [buyRentValue, setBuyRentValue] = useState("Buy");
  const [bhkValue, setBhkValue] = useState("Bedrooms");
  const [propertyValue, setPropertyValue] = useState("Type");
  const [constructionstatusvalues, setConstructionStatusValues] = useState([]);
  const [furnishingstatusValues, setFurnishingStatusValues] = useState([]);
  const [amenitiesvalues, setAmenitiesValues] = useState([]);
  const [postedbyValues, setPostedByValues] = useState([]);
  const [purchasetypevalues, setPurchaseTypeValues] = useState([]);
  const [bathroomvalues, setBathroomValues] = useState([]);
  const [balconyvalues, setBalconyValues] = useState([]);

  const [range, setRange] = useState([100, 10000]); // Default min-max values
  const [priceRange, setPriceRange] = useState([0, 1000000000]); // Price range state

  const [propertiesList, setPropertiesList] = useState([]);
  const [originalpropertiesList, setOriginalPropertiesList] = useState([]);

  const [filteropen, setFilterOpen] = useState(false);

  const [variables, setVariables] = useState({
    bhklist: [],
    propertytypelist: [],
    constructionstatuslist: [],
    amenitieslist: [],
    furnishingstatuslist: [],
    purchasetypelist: [],
    postedbylist: [],
  });

  const bathrooms = ["1", "2", "3", "4", "5"];
  const balconies = ["1", "2", "3", "4", "5"];

  const [appliedFilters, setAppliedFilters] = useState([]);

  // Function to update applied filters whenever filter values change
  useEffect(() => {
    const filters = [];

    if (bhkValue && bhkValue !== "Bedrooms") {
      filters.push({ type: "bhk", label: "BHK", value: bhkValue });
    }

    if (propertyValue && propertyValue !== "Type") {
      filters.push({
        type: "propertyType",
        label: "Type",
        value: propertyValue,
      });
    }

    if (constructionstatusvalues.length > 0) {
      filters.push({
        type: "constructionStatus",
        label: "Construction",
        value: constructionstatusvalues.join(", "),
      });
    }

    if (postedbyValues.length > 0) {
      filters.push({
        type: "postedby",
        label: "Posted By",
        value: postedbyValues.join(", "),
      });
    }

    if (amenitiesvalues.length > 0) {
      filters.push({
        type: "amenities",
        label: "Amenities",
        value: amenitiesvalues.join(", "),
      });
    }

    if (bathroomvalues.length > 0) {
      filters.push({
        type: "bathrooms",
        label: "Bathrooms",
        value: bathroomvalues.join(", "),
      });
    }

    if (balconyvalues.length > 0) {
      filters.push({
        type: "balconies",
        label: "Balconies",
        value: balconyvalues.join(", "),
      });
    }

    if (furnishingstatusValues.length > 0) {
      filters.push({
        type: "furnishing",
        label: "Furnishing",
        value: furnishingstatusValues.join(", "),
      });
    }

    if (priceRange[0] !== 0 || priceRange[1] !== 1000000000) {
      filters.push({
        type: "price",
        label: "Price",
        value: `₹${priceRange[0]} - ₹${priceRange[1]}`,
      });
    }

    setAppliedFilters(filters);
  }, [
    bhkValue,
    propertyValue,
    constructionstatusvalues,
    amenitiesvalues,
    furnishingstatusValues,
    priceRange,
    postedbyValues,
    balconyvalues,
    bathroomvalues,
  ]);

  // Function to handle removing a filter
  const handleRemoveFilter = (filter) => {
    switch (filter.type) {
      case "bhk":
        setBhkValue("Bedrooms");
        break;
      case "propertyType":
        setPropertyValue("Type");
        break;
      case "constructionStatus":
        setConstructionStatusValues([]);
        break;
      case "postedby":
        setPostedByValues([]);
        break;
      case "amenities":
        setAmenitiesValues([]);
        break;
      case "balconies":
        setBalconyValues([]);
        break;
      case "bathrooms":
        setBathroomValues([]);
        break;
      case "furnishing":
        setFurnishingStatusValues([]);
        break;
      case "price":
        setPriceRange([0, 1000000000]);
        break;
      default:
        break;
    }
  };

  const [windowwidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // This code only runs on the client side
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    if (propertyValue && propertyValue !== "Type") {
      newlist = newlist.filter((item) => item.type == propertyValue);
    }

    if (constructionstatusvalues && constructionstatusvalues.length > 0) {
      newlist = newlist.filter((item) =>
        constructionstatusvalues.includes(item.constructionstatus)
      );
    }

    if (postedbyValues && postedbyValues.length > 0) {
      newlist = newlist.filter((item) =>
        postedbyValues.includes(item.postedby)
      );
    }

    if (bathroomvalues && bathroomvalues.length > 0) {
      const maxBathrooms = Math.max(
        ...bathroomvalues.map((val) => parseInt(val))
      );
      newlist = newlist.filter(
        (item) => parseInt(item.bathrooms) <= maxBathrooms
      );
    }

    if (balconyvalues && balconyvalues.length > 0) {
      const maxBalconies = Math.max(
        ...balconyvalues.map((val) => parseInt(val))
      );
      newlist = newlist.filter(
        (item) => parseInt(item.balconies) <= maxBalconies
      );
    }

    // Filter by Amenities (ALL selected amenities must be present)
    if (amenitiesvalues && amenitiesvalues.length > 0) {
      newlist = newlist.filter((item) =>
        amenitiesvalues.every((amenity) => item.amenities.includes(amenity))
      );
    }

    // Filter by furnishing status
    if (furnishingstatusValues && furnishingstatusValues.length > 0) {
      newlist = newlist.filter((item) =>
        furnishingstatusValues.includes(item.furnishing)
      );
    }

    // Filter by Purchase Type
    if (purchasetypevalues && purchasetypevalues.length > 0) {
      newlist = newlist.filter((item) =>
        purchasetypevalues.includes(item.purchasetype)
      );
    }

    // Filter by Price Range
    if (priceRange) {
      newlist = newlist.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );
    }

    setPropertiesList(newlist);
  };

  useEffect(() => {
    filterpropertylist();
  }, [
    propertyValue,
    bhkValue,
    priceRange,
    constructionstatusvalues,
    amenitiesvalues,
    furnishingstatusValues,
    postedbyValues,
    bathroomvalues,
    balconyvalues,
  ]);

  const handleReset = () => {
    setBhkValue("Bedrooms");
    setPropertyValue("Type");
    setConstructionStatusValues([]);
    setAmenitiesValues([]);
    setRange([100, 10000]);
    setPriceRange([0, 10000000000]);
    setPropertiesList(originalpropertiesList);
    setFurnishingStatusValues([]);
  };

  return (
    <>
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="hidden lg:block">
        <PropertiesNav />
      </div>

      <div className="bg-gray-100 mt-[8vh] lg:mt-[14vh] lg:pt-[5vh] min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <QueryParamsHandler
            onParams={useCallback(({ type, view, search }) => {
              setType(type);
              setView(view);
              setSearch(search);
            }, [])}
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

        {/* Filter & Sort Buttons */}
        <div className="mt-[2vh]   flex justify-between px-5">
          <button
            onClick={() => setFilterOpen(!filteropen)}
            className="lg:hidden border-[#f3701f] border-2 py-2 px-4 flex gap-2 rounded-xl"
          >
            <span className="text-[#f3701f]">Filter</span>
            <FilterIcon width={18} fill="#f3701f" />
          </button>
          {/* <button className="py-2 lg:ml-auto px-4 flex items-center gap-2 rounded-xl">
            <span className="text-[#f3701f]">Sort</span>
            <SortIcon width={20} fill="#f3701f" />
          </button> */}
        </div>
        {/* Filter Sidebar  */}
        <div
          className={`w-[65%] lg:w-[30%] max-h-[55vh] lg:max-h-[70vh] bg-[#fff] fixed rounded-2xl mt-[12vh] lg:mt-[5vh] z-30 lg:z-0 pl-[8%] pr-4 lg:px-[2%] py-5 border-2 border-[#f3701f] lg:border-gray-300 transition-transform duration-500 ease-in-out overflow-y-scroll 
    lg:translate-x-[5%] ${
      filteropen ? "translate-x-[-10%]" : "-translate-x-full"
    }`}
        >
          <div>
            <AppliedFilters
              filters={appliedFilters}
              onRemoveFilter={handleRemoveFilter}
            />

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

          {/* Purchase Type  */}
          <div>
            <div className="mt-4 flex gap-3">
              <span className="font-semibold text-lg">Purchase Type</span>

              <AngleDownIcon width={20} fill="#000" />
            </div>

            {variables.purchasetypelist &&
              variables.purchasetypelist.length > 0 &&
              variables.purchasetypelist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={purchasetypevalues.includes(item)} // Check if item exists in state array
                      onChange={(e) => {
                        setPurchaseTypeValues(
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

          <div className="mt-4">
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

          {/* Bathrooms Section   */}

          <div>
            <div className="mt-4 flex gap-3">
              <span className="font-semibold text-lg">Bathrooms</span>

              <AngleDownIcon width={20} fill="#000" />
            </div>
            {bathrooms.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={bathroomvalues.includes(item)} // Check if item exists in state array
                    onChange={(e) => {
                      setBathroomValues(
                        (prev) =>
                          prev.includes(item)
                            ? prev.filter((val) => val !== item) // Remove if already selected
                            : [...prev, item] // Add if not selected
                      );
                    }}
                  />
                  <span>
                    {item != "1" ? `${item} Bathrooms` : `${item} Bathroom`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Balconies Section   */}

          <div>
            <div className="mt-4 flex gap-3">
              <span className="font-semibold text-lg">Balconies</span>

              <AngleDownIcon width={20} fill="#000" />
            </div>
            {balconies.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={balconyvalues.includes(item)} // Check if item exists in state array
                    onChange={(e) => {
                      setBalconyValues(
                        (prev) =>
                          prev.includes(item)
                            ? prev.filter((val) => val !== item) // Remove if already selected
                            : [...prev, item] // Add if not selected
                      );
                    }}
                  />
                  <span>
                    {item != "1" ? `${item} Balconies` : `${item} Balcony`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Postedby section  */}

          <div>
            <div className="mt-4 flex gap-3">
              <span className="font-semibold text-lg">Posted By</span>

              <AngleDownIcon width={20} fill="#000" />
            </div>
            {variables.postedbylist &&
              variables.postedbylist.length > 0 &&
              variables.postedbylist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={postedbyValues.includes(item)} // Check if item exists in state array
                      onChange={(e) => {
                        setPostedByValues(
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

          {/* // Amenities Section */}
          <div>
            <div className="mt-4 flex gap-3">
              <span className="font-semibold text-lg">Amenities</span>

              <AngleDownIcon width={20} fill="#000" />
            </div>
            {variables.amenitieslist &&
              variables.amenitieslist.length > 0 &&
              variables.amenitieslist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex gap-2">
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

          {/* Furnishing Status  */}
          <div>
            <div className="mt-4 flex gap-3">
              <span className="font-semibold text-lg">Furnishing Status</span>

              <AngleDownIcon width={20} fill="#000" />
            </div>

            {variables.furnishingstatuslist &&
              variables.furnishingstatuslist.length > 0 &&
              variables.furnishingstatuslist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={furnishingstatusValues.includes(item)} // Check if item exists in state array
                      onChange={(e) => {
                        setFurnishingStatusValues(
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
              onClick={() => {
                setFilterOpen(false);
              }}
              className="bg-[#f3701f] py-2 px-4 rounded-xl text-white"
            >
              Close
            </button>
          </div>
        </div>

        <section className="flex mt-[2vh] lg:-mt-8  px-[5%] lg:px-[3%] w-full gap-2 lg:fixed">
          <PriceDropdown
            onApply={(range) => {
              setPriceRange(range);
              filterpropertylist();
            }}
          />
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
        {/* Properties List */}
        <section className=" px-[5%] lg:ml-[30%] py-5 flex flex-col gap-4">
          <div></div>
          {Array.isArray(propertiesList) && propertiesList.length > 0 ? (
            propertiesList.map((item, key) => (
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

                  <button
                    onClick={() =>
                      router.push(`/singleproperty?id=${item.property_id}`)
                    }
                    className="mt-2 px-3 py-1 lg:py-2 bg-[#FF5D00] text-white rounded text-sm lg:max-w-[40%]"
                  >
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
    </>
  );
};

export default Page;
