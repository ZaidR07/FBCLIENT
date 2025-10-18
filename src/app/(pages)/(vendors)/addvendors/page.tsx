"use client";
import AdminHeader from "@/app/components/AdminHeader";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/lib/axios";


const Page = () => {
  const [formdata, setFormdata] = useState({
    vendorname: "",
    category: "",
    companyname: "",
    emailid: "",
    mobile1: "",
    mobile2: "",
    address: "",
    photo: null,
  });
  const categories = [
    {
      id: 1,
      label: "Home Interior",
      emoji: "🛋️",
    },
    {
      id: 2,
      label: "Modular Kitchen",
    },
    {
      id: 3,
      label: "Plumbing",
      emoji: "🚿",
    },
    {
      id: 4,
      label: "Electric",
      emoji: "💡",
    },
    {
      id: 5,
      label: "Broadband",
      emoji: "🛜",
    },
    {
      id: 6,
      label: "Pest Control",
      emoji: "🪳",
    },
    {
      id: 7,
      label: "Hardwares",
      emoji: "🏪🛠️",
    },
    {
      id: 8,
      label: "Furniture",
      emoji: "🛏️",
    },
    {
      id: 9,
      label: "Painter",
    },
    {
      id: 10,
      label: "Carpenter",
    },
    {
      id: 11,
      label: "HouseKeeping / Maid",
    },
    {
      id: 12,
      label: "Deep Cleaners",
    },
    {
      id: 13,
      label: "AC Services",
    },
    {
      id: 14,
      label: "Legal Works",
    },
  ];
  

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

  const handleCategorychange = (e) => {
    const { name, value } = e.target;

    if (value !== "0") {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
      const response = await axiosInstance.post('/api/addvendor', formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data?.message) {
        toast.success(`${response.data.message}`);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      toast.error("Failed to add broker. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      
      <div
        className={`${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        } transition-all duration-500 pt-[12vh] px-4 lg:px-8 pb-8`}
      >
        <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Vendor</h1>
        <form
          className="p-6 lg:p-8 bg-white rounded-2xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              name="vendorname"
              value={formdata.vendorname}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="Enter vendor name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              onChange={handleCategorychange}
              required
            >
              <option value="0">Select a category</option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input
              name="companyname"
              value={formdata.companyname}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="Enter company name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Id <span className="text-red-500">*</span>
            </label>
            <input
              name="emailid"
              value={formdata.emailid}
              onChange={handleChange}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="vendor@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number 1 <span className="text-red-500">*</span>
            </label>
            <input
              name="mobile1"
              value={formdata.mobile1}
              onChange={handleChange}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="+91 9876543210"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number 2</label>
            <input
              name="mobile2"
              value={formdata.mobile2}
              onChange={handleChange}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="+91 9876543210"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Address <span className="text-red-500">*</span>
            </label>
            <input
              name="address"
              value={formdata.address}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vendor Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Add Vendor
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
