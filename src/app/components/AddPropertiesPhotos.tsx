"use client";
import { useState } from "react";

const AddPropertiesPhotos = (props) => {
  const { formdata, onImagesChange } = props; // Destructure props
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Update the images in the parent component
    const newImages = [...formdata.images, ...files];
    onImagesChange(newImages); // Call the function passed from the parent

    // Update the preview URLs
    setPreviewUrls((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  return (
    <div className="mt-[2vh]">
      <section className="">
        <h2 className="text-lg text-[#FF5D00] mb-4">Property Images</h2>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full border p-2 rounded-md"
        />

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

        {/* "Add More" Button */}
        <button
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => document.querySelector("input[type='file']").click()}
        >
          Add More Images
        </button>
      </section>
    </div>
  );
};

export default AddPropertiesPhotos;