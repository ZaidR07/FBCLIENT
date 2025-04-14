"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Profile from "./Profile";
import Register from "./Register";

const HamIcon = ({ opennav }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      fill="#130535ca"
      viewBox="0 0 512 512"
      className="cursor-pointer"
      animate={{ scale: [0.8, 1.1, 0.8] }} // Enlarges and shrinks
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} // Smooth looping
      onClick={opennav} // Pass function to update state
    >
      <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
    </motion.svg>
  );
};


const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={16}
    fill="#FF5D00"
  >
    <path d="M256 0c17.7 0 32 14.3 32 32v34.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-34.7C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-34.7C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h34.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zm-128 256a128 128 0 1 0 256 0 128 128 0 1 0-256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
  </svg>
);

const MicroPhone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={14}
    fill="#FF5D00"
  >
    <path d="M96 96v160c0 53 43 96 96 96s96-43 96-96h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80v-32h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80v-32h-80c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96s-96 43-96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128v-40c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4v33.6h-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h144c13.3 0 24-10.7 24-24s-10.7-24-24-24h-48v-33.6c85.8-11.7 152-85.3 152-174.4v-40c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z" />
  </svg>
);

const placeholders = [
  "Search Location....",
  "Search Project....",
  "Search Society....",
  "Search Property....",
];

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
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );
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
    //@ts-ignore
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

  return (
    <div className=" bg-[#FF5C01]  px-6 lg:h-[10vh] shadow-xl ml-[5%] w-[70%] rounded-xl  flex items-center gap-4">
      {/* Dropdown for Property Type */}
      <select
        className="p-1 lg:p-2 border lg:border-2 rounded-md outline-none bg-[#fff] text-xs text-[#FF5C01] lg:text-base"
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
        className="outline-none  bg-[#fff] py-1 text-sm lg:text-lg w-full lg:pl-6 text-[#ff5d00] rounded-xl"
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
      <button
        onClick={startListening}
        className="p-2 lg:p-4 bg-[#fff] rounded-full"
      >
        <MicroPhone />
      </button>

      {/* Search Button */}
      <a
        href={`/${propertyType}properties?search=${encodeURIComponent(
          searchText
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 lg:px-6 lg:py-2 py-1 bg-[#fff] rounded-md text-xs lg:text-base text-[#FF5C01] text-center"
        onClick={(e) => {
          if (!searchText.trim()) {
            e.preventDefault();
            alert("Please enter a search term!");
          }
        }}
      >
        Search
      </a>
    </div>
  );
};

const PropertiesNav = () => {
  const router = useRouter();

  const [user, setUser] = useState(null); // State for user
  const [registeropen, setRegisterOpen] = useState(false);

  const userCookie = Cookies.get("user"); // Using js-cookie

  const getUserCookie = () => {
    if (userCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userCookie))); // Parse JSON safely
      } catch {
        setUser(userCookie); // Fallback if not JSON
      }
    }
  };

  // Extract user from cookies
  useEffect(() => {
    getUserCookie();
  }, [userCookie]);

  return (
    <nav className="w-full bg-[#fff] items-center fixed top-0 z-[999] flex px-[2.5%]">
      <Register registeropen={registeropen} setRegisterOpen={setRegisterOpen} />
      <Image
        src="/Fb_logo.jpg"
        width={90}
        height={90}
        alt="logo"
        className=""
        onClick={() => router.push("/")}
      />
      <Searchsection />
      <div className="ml-[5%]">
        {user ? (
          <Profile user={user} />
        ) : (
          <button
            className="text-lg text-white px-6 py-2 bg-[#FF5D00] rounded-md"
            onClick={() => setRegisterOpen(true)}
          >
            Sign up
          </button>
        )}
      </div>
    </nav>
  );
};

export default PropertiesNav;
