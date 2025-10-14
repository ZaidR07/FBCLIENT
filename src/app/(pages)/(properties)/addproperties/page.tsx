"use client";
import AdminHeader from "@/app/components/AdminHeader";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddPropertiesPhotos from "@/app/components/AddPropertiesPhotos";

import { useSelector, useDispatch } from "react-redux";
import { setlocation } from "@/slices/locationSlice";
import LocationBox from "@/app/components/LocationBox";
import { motion } from "framer-motion";
import {
  LocationField,
  HighlightsField,
  AmenitiesField,
  SelectField,
  AreaField,
  BedroomsField,
  PropertyTypeField,
} from "@/app/components/properties";
import {
  useGetVariables,
  useGetBuildings,
  useAddProperty,
} from "@/hooks/properties";

const Page = () => {
  const [forValue, setForValue] = useState("");
  const [forbox, setForbox] = useState(true);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const locationstate = useSelector((state: any) => state.location.location);

  const dispatch = useDispatch();

  // React Query Hooks
  const { data: variables = {} } = useGetVariables();
  const { data: buildings = [] } = useGetBuildings(locationstate);
  const addPropertyMutation = useAddProperty();

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
    postedby: "Company",
    type: "",
    constructionstatus: "",
    furnishing: "",
    highlights: [],
    location: "",
    line: "",
    images: [],
  });

  const [highlightInput, setHighlightInput] = useState("");
  const [currentpropertytype, setCurrentPropertytype] = useState(1);
  const [sidebaropen, setSidebarOpen] = useState(false);

  // Update suggestions when buildings data changes
  useEffect(() => {
    if (buildings && buildings.length > 0) {
      setSuggestions(buildings);
    }
  }, [buildings]);

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
    setIsLoading(true);

    try {
      const formData = new FormData();

      for (const key in formdata) {
        if (key === "images") {
          formdata.images.forEach((file) => {
            formData.append(`images`, file);
          });
        } else if (Array.isArray(formdata[key])) {
          formData.append(key, JSON.stringify(formdata[key]));
        } else {
          formData.append(key, formdata[key]);
        }
      }

      formData.append("for", forValue);

      await addPropertyMutation.mutateAsync(formData);
      toast.success("Property added successfully!");

      // Reset form
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
        postedby: "Company",
        type: "",
        constructionstatus: "",
        furnishing: "",
        highlights: [],
        location: "",
        line: "",
        images: [],
      });
      setHighlightInput("");
      setCurrentPropertytype(1);
      dispatch(setlocation(""));
      setForbox(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex bg-gray-100 min-h-[88vh] lg:mt-[12vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`w-full px-[6%] py-[5vh] ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
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
          <PropertyTypeField
            value={formdata.type}
            options={variables?.propertytypelist || []}
            onChange={handleChange}
            onCategoryChange={setCurrentPropertytype}
          />

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
              <BedroomsField
                value={formdata.bedrooms}
                options={variables.bhklist || []}
                onChange={handleChange}
              />
            </>
          )}

          <AreaField
            area={formdata.area}
            areaunits={formdata.areaunits}
            onChange={handleChange}
          />

          {currentpropertytype === 1 && (
            <>
              <SelectField
                label="Bathrooms"
                name="bathrooms"
                value={formdata.bathrooms}
                options={["1", "2", "3", "4", "5", "6"]}
                onChange={handleChange}
                required
              />
              <SelectField
                label="Balconies"
                name="balconies"
                value={formdata.balconies}
                options={["0", "1", "2", "3", "4", "5"]}
                onChange={handleChange}
                required
              />
            </>
          )}

          {forValue == "Sale" && currentpropertytype != 3 && (
            <>
              <SelectField
                label="Facing"
                name="facing"
                value={formdata.facing}
                options={["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]}
                onChange={handleChange}
              />
              <SelectField
                label="Construction Status"
                name="constructionstatus"
                value={formdata.constructionstatus}
                options={variables.constructionstatuslist || []}
                onChange={handleChange}
                required
              />
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

          <SelectField
            label="Train Line"
            name="line"
            value={formdata.line}
            options={variables.linelist || []}
            onChange={handleChange}
            required
          />

          <LocationField
            value={formdata.location}
            options={variables.locationlist || []}
            onChange={(value) => setFormdata({...formdata, location: value})}
          />

          {currentpropertytype != 3 && (
            <SelectField
              label="Furnishing"
              name="furnishing"
              value={formdata.furnishing}
              options={variables.furnishingstatuslist || []}
              onChange={handleChange}
              required
            />
          )}

          <HighlightsField
            highlights={formdata.highlights}
            highlightInput={highlightInput}
            onInputChange={setHighlightInput}
            onAdd={addHighlight}
            onRemove={removeHighlight}
          />

          {currentpropertytype != 3 && (
            <AmenitiesField
              selected={formdata.amenities}
              options={variables.amenitieslist || []}
              onChange={(amenities) => setFormdata({...formdata, amenities})}
            />
          )}
          //@ts-ign
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
        <div className="absolute top-[35vh] left-[15%] w-[70%] lg:w-[30%] lg:left-[40%] bg-[#FF5D00] shadow-lg rounded-xl px-8 py-4">
          <h1 className="text-center font-bold text-white">Listing For</h1>
          <div className="w-full mt-2 flex justify-between">
            <button
              onClick={() => {
                setForValue("Sale");
                setForbox(false);
              }}
              className="px-6 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
            >
              Sale
            </button>
            <button
              onClick={() => {
                setForValue("Rent");
                setForbox(false);
              }}
              className="px-6 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
            >
              Rent
            </button>
            <button
              onClick={() => {
                setForValue("Rent");
                setForbox(false);
              }}
              className="px-6 py-1 text-[#FF5D00] font-semibold bg-white rounded-2xl"
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

      {/* loader component */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
        </div>
      )}
    </div>
  );
};

export default Page;
