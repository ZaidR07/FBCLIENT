"use client";
import React, { useState } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { uri } from "@/constant";

const Page = () => {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebaropen, setSidebarOpen] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Create preview URLs
    // @ts-expect-error
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...files]);
    setPreviewUrls((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(`${uri}carouselupload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status != 200) {
        return;
      }

      toast.success("Images uploaded successfully!");
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      toast.error("Failed to upload images. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative mt-[12vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      

      <section className={` py-4 bg-white shadow-lg rounded-lg  mx-auto mt-6 px-[5%] w-full ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}>
        <h2 className="text-xl text-[#FF5D00] text-center font-semibold mb-4">
          Carousel Images
        </h2>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full border p-2 rounded-md"
        />

        {/* "Add More" Button */}
        <button
          className="mt-6  w-[100%] bg-[#FF5D00] text-white px-4 py-2 rounded-md"
          //@ts-expect-error
          onClick={() => document.querySelector("input[type='file']").click()}
        >
          Add More
        </button>

        {/* Image Preview */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {previewUrls.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`mt-4 w-[100%] px-6 py-2 rounded-md text-white ${
            loading ? "bg-gray-500" : "bg-green-500"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </section>
    </div>
  );
};

export default Page;
