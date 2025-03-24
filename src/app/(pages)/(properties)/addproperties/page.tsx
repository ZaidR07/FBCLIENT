"use client";
import AdminHeader from "@/app/components/AdminHeader";
import { uri } from "@/constant";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Select from "react-select";
import AddPropertiesPhotos from "@/app/components/AddPropertiesPhotos";

const Page = () => {
  const [forValue, setForValue] = useState("");
  const [forbox, setForbox] = useState(true);

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
    price: "",
    type: "", // Select field for property type
    constructionstatus: "",
    furnishing: "",
    highlights: [], // Array to store multiple highlights
    location: "",
    line: "",
    images: [],
  });

  const [variables, setVariables] = useState({
    bhklist: [],
    propertytypelist: [],
    furnishingstatuslist: [],
    amenitieslist: [],
    constructionstatuslist: [],
    linelist: [],
    locationlist: [],
  });

  const handleload = async () => {
    const response = await axios.get(`${uri}getvariables`);
    if (response.status == 200) {
      setVariables(response.data.payload);
    }
  };

  const [highlightInput, setHighlightInput] = useState("");
  const [currentpropertytype, setCurrentPropertytype] = useState(1);
  const [sidebaropen, setSidebarOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append all form data fields to the FormData object
      for (const key in formdata) {
        if (key === "images") {
          // Append each file in the images array
          formdata.images.forEach((file, index) => {
            formData.append(`images`, file);
          });
        } else if (Array.isArray(formdata[key])) {
          // Append array fields as JSON strings
          formData.append(key, JSON.stringify(formdata[key]));
        } else {
          // Append other fields
          formData.append(key, formdata[key]);
        }
      }

      // Append the 'for' value
      formData.append("for", forValue);

      // Send the FormData to the server
      const response = await axios.post(`${uri}addproperties`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });

      if (response.data?.message) {
        toast.success(response.data.message);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      toast.error("Failed to add property. Please try again.");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    handleload();
  }, []);

  return (
    <>
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <ToastContainer
        position="top-center"
        style={{ top: "0vh", zIndex: 9999999999999 }}
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="w-full min-h-[90vh] bg-gray-200 px-[6%] py-[5vh] mt-[8vh]">
        <h1 className="text-2xl text-center mb-5 text-[#FF5D00]">
          Add Property
        </h1>
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

          {/* Society Name */}
          <div className="mb-4">
            <label>
              Society / Building / Plot Name{" "}
              <span className="text-red-700 text-xl">*</span>{" "}
            </label>
            <input
              name="Societyname"
              value={formdata.Societyname}
              onChange={handleChange}
              type="text"
              className="border-b-2 border-black w-full"
              required
            />
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
              {/* // Property Age */}
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
            className="bg-[#FF5D00] text-white px-4 py-2 rounded-md mt-8 w-full "
          >
            Add Property
          </button>
        </form>
      </div>
      {forbox && (
        <div className="absolute top-[35vh] left-[15%] w-[70%] bg-[#FF5D00] shadow-lg rounded-xl px-8 py-4">
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
    </>
  );
};

export default Page;
