"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={16} fill="#FF5D00">
    <path d="M256 0c17.7 0 32 14.3 32 32v34.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-34.7C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-34.7C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h34.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zm-128 256a128 128 0 1 0 256 0 128 128 0 1 0-256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
  </svg>
);

const MicroPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={14} fill="#FF5D00">
    <path d="M96 96v160c0 53 43 96 96 96s96-43 96-96h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80v-32h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80v-32h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96s-96 43-96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128v-40c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4v33.6h-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h144c13.3 0 24-10.7 24-24s-10.7-24-24-24h-48v-33.6c85.8-11.7 152-85.3 152-174.4v-40c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/>
  </svg>
);

const placeholders = ["Search Location....", "Search Project....", "Search Society....", "Search Property...."];

const Searchsection = () => {
  const router = useRouter();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [propertyType, setPropertyType] = useState("buy");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isFocused) {
      interval = setInterval(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isFocused]);

  // Start voice recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice input!");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
    };

    recognition.start();
  };

  // Handle Search Navigation
  const handleSearch = () => {
    if (!searchText.trim()) {
      alert("Please enter a search term!");
      return;
    }
    router.push(`/${propertyType}/properties?query=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="w-[85%] bg-white shadow-xl px-3 py-2 rounded-xl -mt-6 z-[9999999] absolute ml-[6.5%] flex items-center gap-2">
      {/* Dropdown for Property Type */}
      <select 
        className="p-1 border rounded-md text-gray-600 bg-white text-xs" 
        value={propertyType} 
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="buy">Buy</option>
        <option value="rent">Rent</option>
        <option value="pg">PG</option>
      </select>

      {/* Animated Input Field */}
      <motion.input
        key={isFocused ? "fixed-placeholder" : placeholderIndex} // Prevent animation restart when typing
        className="bg-transparent outline-none text-sm w-full text-gray-600"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={isFocused ? "" : placeholders[placeholderIndex]} // Show empty placeholder when typing
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onFocus={() => setIsFocused(true)} // Stop placeholder animation
        onBlur={() => setIsFocused(false)} // Resume animation when unfocused
      />

      {/* Voice Input Button */}
      <button onClick={startListening} className="p-2 bg-orange-100 rounded-full">
        <MicroPhone />
      </button>

      {/* Search Button */}
      <button onClick={handleSearch} className="px-2 py-1 bg-[#FF5D00] rounded-md text-xs text-white ">
        Search
      </button>
    </div>
  );
};

export default Searchsection;
