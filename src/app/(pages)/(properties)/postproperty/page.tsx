"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

import Select from "react-select";
import AddPropertiesPhotos from "@/app/components/AddPropertiesPhotos";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setlocation } from "@/slices/locationSlice";
import LocationBox from "@/app/components/LocationBox";
import {
  LocationField,
  HighlightsField,
  AmenitiesField,
  PropertyBasicDetailsSection,
  PropertyBuildingSection,
  PropertyPricingSection,
} from "@/app/components/properties";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const who = searchParams.get("who");
  
  const [forValue, setForValue] = useState("");
  const [forbox, setForbox] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const locationstate = useSelector((state: any) => state.location.location); // ✅ useSelector

  const dispatch = useDispatch();

  const [user, setUser] = useState(null); // State for user (email)
  const [userId, setUserId] = useState(null); // State for user_id or owner_id
  const [broker, setBroker] = useState(null); // State for broker

  const userCookie = Cookies.get("user") || Cookies.get("owner"); // Using js-cookie
  // NOTE: Broker cookie is HttpOnly; it cannot be read from client-side JS. Do not attempt Cookies.get('broker').

  // Check broker authentication
  useEffect(() => {
    if (who === "broker") {
      console.log("Checking broker authentication");
      // Directly verify with backend; HttpOnly cookie will be sent automatically via withCredentials
      const verifyBroker = async (retryCount = 0) => {
        try {
          console.log("Verifying broker cookie with backend");
          const response = await axiosInstance.get('/api/verifybrokercookie');
          if (response.status === 200) {
            console.log("Broker verification successful", response.data.broker);
            setBroker(response.data.broker);
          }
        } catch (error: any) {
          console.error("Broker verification failed", error);
          // Only redirect if it's definitely an auth error
          if (error.response?.status === 401 || error.response?.data?.requiresBrokerAuth) {
            toast.error("Invalid broker session. Please login again.");
            router.push("/");
          } else if (retryCount < 3) {
            // Retry up to 3 times for transient errors
            console.log(`Retrying broker verification (${retryCount + 1}/3)`);
            setTimeout(() => verifyBroker(retryCount + 1), 500);
          } else {
            // For other errors (network, server issues), don't redirect
            toast.error("Unable to verify broker session. Please try again.");
            setBroker(null);
          }
        }
      };
      verifyBroker();
    }
  }, [who, router]);

  const getUserCookie = () => {
    if (userCookie) {
      try {
        // Decode JWT token to extract user/owner information
        const payload = JSON.parse(atob(userCookie.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        setUser(payload.email); // Set email
        setUserId(payload.id); // Set user_id or owner_id from token
        console.log("User authenticated:", { email: payload.email, id: payload.id, role: payload.role });
      } catch (error) {
        console.error("Error decoding user token:", error);
        // Fallback to old format if JWT decode fails
        try {
          const email = userCookie.split("^");
          setUser(email[0]);
        } catch {
          alert("Something Went Wrong");
        }
      }
    }
  };

  // Extract user from cookies
  useEffect(() => {
    getUserCookie();
  }, [userCookie]);

  const [formdata, setFormdata] = useState({
    Societyname: "",
    floor: "",
    bedrooms: "",
    area: "",
    areaunits: "",
    buildingfloors: "",
    address: "",
    amenities: [],
    facing: "",
    propertyage: "",
    balconies: "",
    bathrooms: "",
    price: "",
    postedby: "", // Will be set to broker_id, owner_id, or user_id
    type: "", // Select field for property type
    constructionstatus: "",
    furnishing: "",
    highlights: [], // Array to store multiple highlights
    location: "",
    line: "",
    images: [],
    availablefor: "",
    reraapproved: [],
    pgservices: [],
    sharing: "",
    totalcapacity: "",
  });

  useEffect(() => {
    if (who === "broker" && broker) {
      // Set postedby to broker_id for brokers
      setFormdata((prev) => ({ ...prev, postedby: broker.broker_id }));
      console.log("Setting postedby to broker_id:", broker.broker_id);
    } else if (userId) {
      // Set postedby to owner_id or user_id from JWT token
      setFormdata((prev) => ({ ...prev, postedby: userId }));
      console.log("Setting postedby to user/owner ID:", userId);
    }
  }, [userId, broker, who]);

  const [variables, setVariables] = useState({
    bhklist: [],
    propertytypelist: [],
    furnishingstatuslist: [],
    amenitieslist: [],
    constructionstatuslist: [],
    linelist: [],
    locationlist: [],
    availableforlist: [],
    reraapprovedlist: [],
    pgserviceslist: [],
    sharinglist: [],
    totalcapacitylist: [],
  });

  const handleload = async () => {
    const response = await axiosInstance.get('/api/getvariables');
    if (response.status == 200) {
      setVariables(response.data.payload);
    }
  };

  const [highlightInput, setHighlightInput] = useState("");
  const [currentpropertytype, setCurrentPropertytype] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addHighlight = () => {
    if (highlightInput.trim() !== "") {
      setFormdata((prevData) => ({
        ...prevData,
        highlights: [...prevData.highlights, highlightInput],
      }));
      setHighlightInput(""); // Clear input after adding
    }
  };

  const handleImagesChange = (newImages) => {
    setFormdata((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const removeHighlight = (index) => {
    setFormdata((prevData) => ({
      ...prevData,
      highlights: prevData.highlights.filter((_, i) => i !== index),
    }));
  };

  const getbuildings = async () => {
    try {
      if (locationstate !== "") {
        const response = await axiosInstance.get('/api/getbuildings', {
          params: { location: locationstate },
        });
        if (response.status !== 200) {
          console.error(response.data.message);
          toast.error("Error Loading Buildings!!");
          return;
        }
        setSuggestions(response.data.payload);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load buildings!");
    }
  };

  useEffect(() => {
    getbuildings();
  }, [locationstate]);

  // Filter suggestions based on Societyname input
  useEffect(() => {
    if (formdata.Societyname.trim() && isFocused && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(formdata.Societyname.toLowerCase())
      );
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  }, [formdata.Societyname, isFocused, suggestions]);

  // Handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    setFormdata((prevData) => ({
      ...prevData,
      Societyname: suggestion,
    }));
    setShowSuggestions(false);
    setIsFocused(false);
    inputRef.current.focus();
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedSuggestionIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const LocationIcon = () => {
    return (
      <svg
        width={20}
        fill="#ff5d00"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
      </svg>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if broker is properly authenticated
    if (who === "broker" && !broker) {
      toast.error("Broker authentication required. Please login again.");
      return;
    }
    
    setIsLoading(true); // Start loading

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append all form data fields to the FormData object
      for (const key in formdata) {
        if (key === "images") {
          formdata.images.forEach((file, index) => {
            formData.append(`images`, file);
          });
        } else if (Array.isArray(formdata[key])) {
          formData.append(key, JSON.stringify(formdata[key]));
        } else {
          formData.append(key, formdata[key]);
        }
      }

      formData.append("for", forValue);

      const response = await axiosInstance.post('/api/addproperties', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);

      // Reset form after successful submission
      const currentPostedBy = who === "broker" && broker ? broker.broker_id : userId;
      setFormdata({
        Societyname: "",
        floor: "",
        bedrooms: "",
        area: "",
        areaunits: "",
        buildingfloors: "",
        address: "",
        amenities: [],
        facing: "",
        propertyage: "",
        balconies: "",
        bathrooms: "",
        price: "",
        postedby: currentPostedBy, // Keep the broker_id, owner_id, or user_id
        type: "",
        constructionstatus: "",
        furnishing: "",
        highlights: [],
        location: "",
        line: "",
        images: [],
        availablefor: "",
        reraapproved: [],
        pgservices: [],
        sharing: "",
        totalcapacity: "",
      });
      setHighlightInput("");
      setCurrentPropertytype(1);
      dispatch(setlocation("")); // Reset location
      setForbox(true); // Show the "Listing For" selection again
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add property. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading in any case
    }
  };

  useEffect(() => {
    handleload();
  }, []);

  return (
    <div className="flex relative ">
      {/* <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} /> */}

      <div className={`w-full min-h-[90vh] bg-gray-200 px-[6%] py-[5vh]`}>
        <h1 className="text-2xl text-center mb-5 text-[#FF5D00]">
          Add Property
        </h1>
        {locationstate && (
          <span
            onClick={() => {
              dispatch(setlocation(""));
            }}
            className="flex gap-2 mb-2 items-center cursor-pointer"
          >
            <LocationIcon /> {locationstate}
          </span>
        )}
        <form className="p-6 bg-white rounded-2xl" onSubmit={handleSubmit}>
          {/* Property Type Select Field */}
          <div className="mb-4">
            <label>
              Property Type <span className="text-red-700">*</span>
            </label>
            <select
              name="type"
              value={formdata.type}
              onChange={(e) => {
                handleChange(e);
                const selectedOption = variables?.propertytypelist.find(
                  (item) => item.name === e.target.value
                );
                if (selectedOption) {
                  setCurrentPropertytype(selectedOption.category);
                }
              }}
              className="border-b-2 border-black w-full mt-3"
              required
            >
              <option value="">Select Type</option>
              {variables?.propertytypelist?.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* Society Name with Suggestions */}
          <div className="mb-4 relative">
            <label>
              Society / Building / Plot Name{" "}
              <span className="text-red-700 text-xl">*</span>
            </label>
            <motion.input
              ref={inputRef}
              name="Societyname"
              value={formdata.Societyname}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              type="text"
              className="border-b-2 border-black w-full mt-3 text-gray-600"
              placeholder={isFocused ? "" : "Enter society name..."}
              required
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <motion.div
                className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {suggestions
                  .filter((suggestion) =>
                    suggestion
                      .toLowerCase()
                      .includes(formdata.Societyname.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <div
                      key={suggestion}
                      className={`px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 ${
                        index === selectedSuggestionIndex ? "bg-gray-100" : ""
                      }`}
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
              </motion.div>
            )}
          </div>

          {currentpropertytype != 3 && (
            <>
              <div className="mb-4 flex ">
                {/* Floor  */}
                <div className="w-[45%] mr-[10%]">
                  <label>
                    Floor <span className="text-red-700 text-xl">*</span>
                  </label>
                  <input
                    name="floor"
                    value={formdata.floor}
                    onChange={handleChange}
                    type="number"
                    className="border-b-2 border-black w-full"
                    required
                  />
                </div>
                <div className="w-[45%]">
                  {/* Building Floors */}
                  <div className="mb-4">
                    <label>
                      Building Floors{" "}
                      <span className="text-red-700 text-xl">*</span>
                    </label>
                    <input
                      name="buildingfloors"
                      value={formdata.buildingfloors}
                      onChange={handleChange}
                      type="number"
                      className="border-b-2 border-black w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label>
                  Bedrooms <span className="text-red-700 text-xl">*</span>
                </label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {variables &&
                    (variables.bhklist || []).map((option, index) => (
                      <label key={index} className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name="bedrooms"
                          value={option}
                          checked={formdata.bedrooms === option}
                          onChange={handleChange}
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* Area */}
          <div className="mb-4">
            <label>
              Area <span className="text-red-700 text-xl">*</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                name="area"
                value={formdata.area}
                onChange={handleChange}
                type="number"
                className="border-b-2 border-black w-full mt-1"
                placeholder="Enter area"
                required
              />
              <select
                name="areaunits"
                value={formdata.areaunits}
                onChange={handleChange}
                className="border-b-2 border-black px-2 py-1"
                required
              >
                <option value="">Select</option>
                <option value="sqft">Sq. Ft</option>
                <option value="sqmt">Sq. Mt</option>
                <option value="acre">Acre</option>
                <option value="guntha">Guntha</option>
                <option value="hectare">Hectare</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="">
              Bathrooms <span className="text-red-700 text-xl">*</span>
            </label>

            <select
              name="bathrooms"
              value={formdata.bathrooms}
              onChange={handleChange}
              className="border-b-2 border-black px-2 py-1 w-full"
              required
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="">
              Balconies <span className="text-red-700 text-xl">*</span>
            </label>

            <select
              name="balconies"
              value={formdata.balconies}
              onChange={handleChange}
              className="border-b-2 border-black px-2 py-1 w-full"
              required
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {forValue !== "PG" && (
            <div className="mb-4">
              <label>Property Age (Yrs)</label>
              <input
                name="propertyage"
                value={formdata.propertyage}
                onChange={handleChange}
                type="number"
                className="border-b-2 border-black w-full"
              />
            </div>
          )}

          {forValue == "Rent" && (
            <div className="mb-4">
              <label>
                Available for <span className="text-red-700">*</span>
              </label>
              <select
                name="availablefor"
                value={formdata.availablefor}
                onChange={handleChange}
                className="border-b-2 border-black w-full mt-2 py-1"
                required
              >
                <option value="">Select</option>
                {variables.availableforlist && variables.availableforlist.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}

          {forValue == "Sale" && currentpropertytype != 3 && (
            <>
              {/* // Facing */}
              <div className="mb-4">
                <label>Facing</label>
                <select
                  name="facing" // ✅ Correct
                  value={formdata.facing}
                  onChange={handleChange}
                  className="border-b-2 border-black w-full mt-2 py-1 "
                >
                  <option value="">Select Direction</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                </select>
              </div>
              {/* // Construction Status */}
              <div className="mb-4">
                <label>
                  Construction Status <span className="text-red-700">*</span>
                </label>
                <select
                  name="constructionstatus" // ✅ Correct
                  value={formdata.constructionstatus}
                  onChange={handleChange}
                  className="border-b-2 border-black w-full mt-2 py-1 "
                  required
                >
                  <option value="">Select Status</option>
                  {variables.constructionstatuslist &&
                    variables.constructionstatuslist.length > 0 &&
                    variables.constructionstatuslist.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>

              {/* RERA Approved (Buy) */}
              <div className="mb-4">
                <label>RERA Approved</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {(variables.reraapprovedlist || []).map((item, index) => {
                    const checked = (formdata.reraapproved || []).includes(item);
                    return (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setFormdata((prev) => ({
                              ...prev,
                              reraapproved: checked
                                ? prev.reraapproved.filter((v) => v !== item)
                                : [...(prev.reraapproved || []), item],
                            }));
                          }}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
          </>
          )}

          {/* PG specific fields */}
          {forValue == "PG" && (
            <>
              <div className="mb-4">
                <label>PG Services</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {(variables.pgserviceslist || []).map((item, index) => {
                    const checked = (formdata.pgservices || []).includes(item);
                    return (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setFormdata((prev) => ({
                              ...prev,
                              pgservices: checked
                                ? prev.pgservices.filter((v) => v !== item)
                                : [...(prev.pgservices || []), item],
                            }));
                          }}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4">
                <label>Sharing Option</label>
                <select
                  name="sharing"
                  value={formdata.sharing}
                  onChange={handleChange}
                  className="border-b-2 border-black w-full mt-2 py-1"
                >
                  <option value="">Select</option>
                  {(variables.sharinglist || []).map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label>Total Capacity</label>
                <select
                  name="totalcapacity"
                  value={formdata.totalcapacity}
                  onChange={handleChange}
                  className="border-b-2 border-black w-full mt-2 py-1"
                >
                  <option value="">Select</option>
                  {(variables.totalcapacitylist || []).map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Price */}
          <div className="mb-4">
            <label> {forValue == "Sale" ? "Price" : "Rent"} (₹)</label>
            <input
              name="price"
              value={formdata.price}
              onChange={handleChange}
              type="number"
              className="border-b-2 border-black w-full"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label>Address</label>
            <input
              name="address"
              value={formdata.address}
              onChange={handleChange}
              type="text"
              className="border-b-2 border-black w-full"
              required
            />
          </div>

          {/* Local train line*/}
          <div className="mb-4">
            <label>
              Train Line <span className="text-red-700">*</span>
            </label>
            <select
              name="line"
              value={formdata.line}
              onChange={handleChange}
              className="border-b-2 border-black w-full mt-3"
              required
            >
              <option value="">Select Type</option>
              {variables &&
                (variables.linelist || []).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="">
              Location <span className="text-red-600">*</span>
            </label>
            <Select
              options={(variables.locationlist || []).map((item, index) => ({
                value: item,
                label: item,
                key: index,
              }))}
              isSearchable
              value={
                formdata.location
                  ? { value: formdata.location, label: formdata.location }
                  : null
              }
              onChange={(selectedOption) =>
                setFormdata((prev) => ({
                  ...prev,
                  location: selectedOption?.value,
                }))
              }
              placeholder="Select a location..."
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#fff",
                  borderColor: "#FF5D00", // Border color (orange)
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#FF5D00", // Border color on hover
                  },
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "#FF5D00", // Selected value text color
                }),
                option: (baseStyles, { isSelected, isFocused }) => ({
                  ...baseStyles,
                  backgroundColor: isSelected
                    ? "#FF5D00" // Selected option color
                    : isFocused
                    ? "#FFD3B6" // Hover color
                    : "#fff", // Default background
                  color: isSelected ? "#fff" : "#000", // Text color
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #FF5D00",
                }),
              }}
            />
          </div>

          {/* Property Type Select Field */}
          {currentpropertytype != 3 && (
            <div className="mb-4">
              <label>
                Furnishing <span className="text-red-700">*</span>
              </label>
              <select
                name="furnishing"
                value={formdata.furnishing}
                onChange={handleChange}
                className="border-b-2 border-black w-full mt-3"
                required
              >
                <option value="">Select Type</option>
                {variables &&
                  (variables.furnishingstatuslist || []).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Highlights Section */}
          <div className="mb-4">
            <label>Highlights</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                className="border-b-2 mt-2 border-black w-full"
                placeholder="Add a highlight..."
              />
              <button
                type="button"
                onClick={addHighlight}
                className="bg-[#FF5D00] text-white px-3 py-1 rounded-md"
              >
                Add
              </button>
            </div>
            {/* Display Added Highlights */}
            <ul className="mt-2">
              {formdata.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md mt-1"
                >
                  {highlight}
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities Section */}
          {currentpropertytype != 3 && (
            <div className="mb-4">
              <label>
                Amenities <span className="text-red-700">*</span>
              </label>
              <div className="flex flex-wrap gap-4 mt-4">
                {variables &&
                  (variables.amenitieslist || []).map((item, index) => {
                    const isSelected = formdata.amenities.includes(item);
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setFormdata((prevData) => ({
                            ...prevData,
                            amenities: isSelected
                              ? prevData.amenities.filter(
                                  (amenity) => amenity !== item
                                )
                              : [...prevData.amenities, item],
                          }));
                        }}
                        className={`p-2 flex items-center gap-2 rounded-xl ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected ? (
                          <span className="text-2xl">-</span>
                        ) : (
                          <span className="text-2xl">+</span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          <AddPropertiesPhotos
            formdata={formdata}
            onImagesChange={handleImagesChange}
          />

          <button
            type="submit"
            className="bg-[#FF5D00] text-white px-4 py-2 rounded-md mt-8 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Add Property"}
          </button>
        </form>
      </div>
      {forbox && (
        <div className="absolute top-[35vh] left-[15%] w-[70%] lg:w-[40%] lg:left-[30%] bg-[#FF5D00] shadow-lg rounded-xl px-8 py-4">
          <h1 className="text-center text-lg md:text-xl lg:text-2xl font-bold text-white">
            Listing For
          </h1>
          <div className="w-full mt-2 md:mt-4 lg:mt-6 flex justify-between">
            <button
              onClick={() => {
                setForValue("Sale");
                setForbox(false);
              }}
              className="px-4 md:px-6 lg:px-8 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
            >
              Sale
            </button>
            <button
              onClick={() => {
                setForValue("Rent");
                setForbox(false);
              }}
              className="px-4 md:px-6 lg:px-8 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
            >
              Rent
            </button>

            <button
              onClick={() => {
                setForValue("PG");
                setForbox(false);
              }}
              className="px-4 md:px-6 lg:px-8 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
            >
              PG
            </button>

            {/* <button
              onClick={() => {
                setForValue("PG");
                setForbox(false);
              }}
              className="px-6 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
            >
              PG
            </button> */}
          </div>
        </div>
      )}
      {!forbox && locationstate == "" && (
        <div className="mt-[10vh]">
          <LocationBox
            locationstate={locationstate}
            setlocation={setlocation}
          />
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
        </div>
      )}
    </div>
  );
};

export default Page;
