"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { uri } from "@/constant";

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

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`${uri}getvariables`);
        if (response.status == 200) {
          setVariables(response.data.payload || {});
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching variables");
      }
    };
    load();
  }, []);

  const handleAddItem = (name, value) => {
    if (!value.trim()) return;
    setFormdata((prev) => ({ ...prev, [name]: [...prev[name], value] }));
  };

  const handleRemoveItem = (name, index) => {
    setFormdata((prev) => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index),
    }));
  };

  const handleDeleteVariable = async (name, value) => {
    try {
      const response = await axios.post(`${uri}deletevariable`, {
        category: name,
        value,
      });
      if (response.status == 200) {
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
      const response = await axios.post(`${uri}addvariables`, {
        payload: formdata,
      });
      if (response.status != 200) {
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
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const renderInputSection = (label, name, placeholder) => (
    <div className="mt-4">
      <label className="block text-gray-700 font-bold">{label}</label>
      {/* Display Current DB Variables with Delete Option */}
      <span className="text-sm text-green-500">
        Current Variables in System :-
      </span>
      {variables[name]?.length > 0 && (
        <ul className="mt-2 text-sm text-green-500">
          {variables[name].map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-200 px-3 py-1 mb-2 rounded-md"
            >
              {item}
              <button
                type="button"
                className="text-red-500 font-bold text-lg"
                onClick={() => handleDeleteVariable(name, item)}
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
        <button
          type="button"
          className="ml-2 max-w-[18%] px-4 py-1 rounded-md text-white bg-[#f3701f] hover:bg-[#d95b17] transition"
          onClick={() =>
            //@ts-ignore
            handleAddItem(name, document.getElementById(name).value)
          }
        >
          Add
        </button>
      </div>

      {/* Display Added Items */}
      {formdata[name].length > 0 && (
        <ul className="mt-2 space-y-1">
          {formdata[name].map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md"
            >
              {item}
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
    <div className="bg-gray-200 w-full min-h-screen">
      <AdminHeader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        className="z-[9999999]"
      />

      <div className="px-[5%] py-[5vh] mt-[10vh]">
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
            "Train Line",
            "linelist",
            "Enter Local train line"
          )}.
          {renderInputSection(
            "Location",
            "locationlist",
            "Example: Goregaon"
          )}
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
