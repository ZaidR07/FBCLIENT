"use client";
import AdminHeader from "@/app/components/AdminHeader";
import { uri } from "@/constant";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


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
      label: "Home Interior",
      value: 1,
    },
    {
      label: "Plumbing",
      value: 2,
    },
    {
      label: "Electric",
      value: 3,
    },
    {
      label: "Broadband",
      value: 4,
    },
    {
      label: "Pest Control",
      value: 5,
    },
    {
      label: "Water Suppliers",
      value: 6,
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

    if (value != "0") {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    return
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
      const response = await axios.post(`${uri}addvendor`, formDataToSend, {
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
    <div className="flex relative lg:top-[12vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />

      <div
        className={`w-full min-h-[88vh] bg-gray-200 px-[10%] lg:px-[20%] py-[5vh] mt-[10vh] lg:mt-0 ${
          sidebaropen ? "lg:w-[77%]" : "lg:w-[90%]"
        }`}
      >
        <h1 className="text-2xl text-center mb-5 text-[#FF5D00]">Add Vendor</h1>
        <form
          className="p-6 lg:p-8 bg-white rounded-2xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label>
              Vendor Name <span className="text-red-700">*</span>
            </label>
            <input
              name="vendorname"
              value={formdata.vendorname}
              onChange={handleChange}
              type="text"
              className="border-b-2 border-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>
              Category <span className="text-red-700">*</span>
            </label>
            <select
              name="category"
              className="border-b-2 mt-4 border-black w-full"
              onChange={handleCategorychange}
            >
              <option value="0">select a category</option>
              {categories?.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label>Company Name</label>
            <input
              name="companyname"
              value={formdata.companyname}
              onChange={handleChange}
              type="text"
              className="border-b-2 border-black w-full"
            />
          </div>
          <div className="mb-4">
            <label>
              Email Id <span className="text-red-700">*</span>
            </label>
            <input
              name="emailid"
              value={formdata.emailid}
              onChange={handleChange}
              type="email"
              className="border-b-2 border-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>
              Mobile Number 1 <span className="text-red-700">*</span>
            </label>
            <input
              name="mobile1"
              value={formdata.mobile1}
              onChange={handleChange}
              type="tel"
              className="border-b-2 border-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>Mobile Number 2</label>
            <input
              name="mobile2"
              value={formdata.mobile2}
              onChange={handleChange}
              type="tel"
              className="border-b-2 border-black w-full"
            />
          </div>
          <div className="mb-4">
            <label>
              Short Address <span className="text-red-700">*</span>
            </label>
            <input
              name="address"
              value={formdata.address}
              onChange={handleChange}
              type="text"
              className="border-b-2 border-black w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>
              Vendor Photo <span className="text-red-700">*</span>
            </label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
              className="border-b-2 border-black w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FF5D00] text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
