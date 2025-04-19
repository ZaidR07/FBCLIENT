"use client";
import { useState, useRef } from "react";

const AddPropertiesPhotos = ({ formdata, onImagesChange }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = Array.from(event.target.files);
    if (!files.length) return;

    // Create preview URLs
    // @ts-ignore
    const newPreviews = files.map(file => URL.createObjectURL(file));

    // Update images in parent component
    const newImages = [...formdata.images, ...files];
    onImagesChange(newImages);

    // Update preview URLs
    setPreviewUrls(prev => [...prev, ...newPreviews]);
    
    // Reset the file input to allow selecting the same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-[2vh]">
      <section>
        <h2 className="text-lg text-[#FF5D00] mb-4">Property Images</h2>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Image Previews */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {previewUrls.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Add Images Button */}
        <button
          type="button"
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={triggerFileInput}
        >
          {formdata.images.length > 0 ? 'Add More Images' : 'Add Images'}
        </button>
      </section>
    </div>
  );
};

export default AddPropertiesPhotos;