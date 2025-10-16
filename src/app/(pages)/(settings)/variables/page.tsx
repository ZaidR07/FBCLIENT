"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import {  toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
const Page = () => {
  const [variables, setVariables] = useState({});
  const [formdata, setFormdata] = useState({
    bhklist: [],
    propertytypelist: [],
    constructionstatuslist: [],
    postedbylist: [],
    amenitieslist: [],
    purchasetypelist: [],
    furnishingstatuslist: [],
    linelist: [],
    locationlist: [],
  });
  const [sidebaropen, setSidebarOpen] = useState(false);

  const load = async () => {
    try {
      const response = await axiosInstance.get('/api/getvariables');
      if (response.status === 200) {
        setVariables(response.data.payload || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching variables");
    }
  };

  useEffect(() => {
    
    load();
  }, []);

  // ** Fixed handleAddItem Function **
  const handleAddItem = (name, value, category = null) => {
    if (!value || value.trim() === "") return; // Prevent empty values

    setFormdata((prev) => ({
      ...prev,
      [name]: Array.isArray(prev[name])
        ? name === "propertytypelist"
          ? [...prev[name], { name: value, category }]
          : [...prev[name], value]
        : [value], // Ensure array initialization
    }));
  };

  const handleRemoveItem = (name, index) => {
    setFormdata((prev) => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index),
    }));
  };

  const handleDeleteVariable = async (name, value) => {
    try {
      const response = await axiosInstance.post('/api/deletevariable', {
        category: name,
        value,
      });
      if (response.status === 200) {
        toast.success("Variable deleted successfully");
        setVariables((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
      } else {
        toast.error("Failed to delete variable");
      }
    } catch (error) {
      toast.error("Error deleting variable");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/addvariables', {
        payload: formdata,
      });
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      setFormdata({
        bhklist: [],
        propertytypelist: [],
        constructionstatuslist: [],
        postedbylist: [],
        amenitieslist: [],
        purchasetypelist: [],
        furnishingstatuslist: [],
        linelist: [],
        locationlist: [],
      });
      load()
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const renderInputSection = (label, name, placeholder) => (
    <div className="mt-4">
      <label className="block text-gray-700 font-bold">{label}</label>
      <span className="text-sm text-green-500">
        Current Variables in System:
      </span>
      {variables[name]?.length > 0 && (
        <ul className="mt-2 text-sm text-green-500">
          {variables[name].map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-200 px-3 py-1 mb-2 rounded-md"
            >
              {name === "propertytypelist" ? item.name : item}
              <button
                type="button"
                className="text-red-500 font-bold text-lg"
                onClick={() =>
                  handleDeleteVariable(
                    name,
                    name === "propertytypelist" ? item.name : item
                  )
                }
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex">
        <input
          type="text"
          className="border-b-2 border-gray-400 w-4/5 px-2 py-1 outline-none"
          id={name}
          placeholder={placeholder}
        />
        {name === "propertytypelist" && (
          <select
            className="ml-2 border-b-2 border-gray-400 px-2 py-1 outline-none"
            id={`${name}-category`}
          >
            <option value="1">Residential</option>
            <option value="2">Commercial</option>
            <option value="3">Plots/Land</option>
          </select>
        )}

        <button
          type="button"
          className="ml-2 max-w-[18%] px-4 py-1 rounded-md text-white bg-[#f3701f] hover:bg-[#d95b17] transition"
          onClick={() => {
            const inputElement = document.getElementById(
              name
            ) as HTMLInputElement | null;
            const categoryElement = document.getElementById(
              `${name}-category`
            ) as HTMLSelectElement | null;

            if (inputElement) {
              handleAddItem(
                name,
                inputElement.value,
                name === "propertytypelist" && categoryElement
                  ? parseInt(categoryElement.value)
                  : null
              );
              inputElement.value = ""; // Clear input field after adding
            }
          }}
        >
          Add
        </button>
      </div>

      {formdata[name].length > 0 && (
        <ul className="mt-2 space-y-1">
          {formdata[name].map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md"
            >
              {name === "propertytypelist"
                ? `${item.name} (${item.category})`
                : item}
              <button
                type="button"
                className="text-red-500 font-bold text-lg"
                onClick={() => handleRemoveItem(name, index)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="bg-gray-200 w-full min-h-screen lg:mt-[12vh] lg:flex">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
    
      <div
        className={`px-[5%] py-[5vh] mt-[10vh] lg:mt-0 w-full ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
        <form
          className="bg-white shadow-xl rounded-lg px-[5%] py-[2vh]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl text-[#f3701f]">Variables</h1>
          {renderInputSection(
            "Bedrooms and Washrooms",
            "bhklist",
            "Enter BHK type"
          )}
          {renderInputSection(
            "Property Type",
            "propertytypelist",
            "Enter property type"
          )}
          {renderInputSection(
            "Construction Status",
            "constructionstatuslist",
            "Enter Construction Status"
          )}
          {renderInputSection("Amenities", "amenitieslist", "Enter Amenities")}
          {renderInputSection(
            "Purchase Type",
            "purchasetypelist",
            "Enter Purchase Type"
          )}
          {renderInputSection(
            "Furnishing Type",
            "furnishingstatuslist",
            "Enter Furnishing Type"
          )}
           {renderInputSection(
            "Posted By",
            "postedbylist",
            "Enter PostedBy type"
          )}
          {renderInputSection(
            "Train Line",
            "linelist",
            "Enter Local train line"
          )}
          {renderInputSection("Location", "locationlist", "Example: Goregaon")}

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-[#f3701f] text-white px-6 py-2 rounded-md hover:bg-[#d95b17] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
