"use client";
import AdminHeader from "@/app/components/AdminHeader";
import { uri } from "@/constant";
import { useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Page = () => {
  const [formdata, setFormdata] = useState({
    brokername: "",
    companyname: "",
    emailid: "",
    mobile1: "",
    mobile2: "",
    address: "",
    photo: null,
  });

  const [sidebaropen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormdata((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formdata).forEach((key) => {
      if (formdata[key]) {
        formDataToSend.append(key, formdata[key]);
      }
    });

    try {
      const response = await axios.post(`${uri}addbroker`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        validateStatus: () => true, // allows us to handle all statuses manually
      });

      if (response.status !== 200) {
        toast.error(response.data.message || "Something went wrong.");
        return; 
      }

      toast.success(response.data.message || "Broker added successfully!");
    } catch (error) {
      toast.error("Failed to add broker. Please try again.");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-[88vh] lg:mt-[12vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
     
      <div
        className={`w-full px-[5%] py-[4vh] mt-[10vh] lg:mt-0 ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Add Broker</h1>
          <span className="text-sm text-gray-500">Create new broker</span>
        </div>
        <form
          className="p-6 lg:p-8 bg-white rounded-2xl shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Broker Name <span className="text-red-700">*</span></label>
              <input
                name="brokername"
                value={formdata.brokername}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                name="companyname"
                value={formdata.companyname}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Id <span className="text-red-700">*</span></label>
              <input
                name="emailid"
                value={formdata.emailid}
                onChange={handleChange}
                type="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number 1 <span className="text-red-700">*</span></label>
              <input
                name="mobile1"
                value={formdata.mobile1}
                onChange={handleChange}
                type="tel"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number 2</label>
              <input
                name="mobile2"
                value={formdata.mobile2}
                onChange={handleChange}
                type="tel"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Short Address <span className="text-red-700">*</span></label>
              <input
                name="address"
                value={formdata.address}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Broker Photo <span className="text-red-700">*</span></label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-[#FF5D00] hover:bg-orange-600 transition text-white px-6 py-2 rounded-xl shadow-md"
            >
              Add Broker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
