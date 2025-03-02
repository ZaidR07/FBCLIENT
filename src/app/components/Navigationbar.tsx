"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy data - Replace this with your API response
const variables = {
  type: ["Apartments", "Villas", "Independent House", "Plots"],
};

const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width={16}
      fill="#FFF"
    >
      <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </svg>
  );
};

const BedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    fill="#FFF"
    viewBox="0 0 640 512"
  >
    <path d="M32 32c17.7 0 32 14.3 32 32v256h224V160c0-17.7 14.3-32 32-32h224c53 0 96 43 96 96v224c0 17.7-14.3 32-32 32s-32-14.3-32-32v-32H64v32c0 17.7-14.3 32-32 32S0 502.1 0 480V64c0-17.7 14.3-32 32-32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
  </svg>
);

const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={16}
    fill="#FFF"
  >
    <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
  </svg>
);

const AngleUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={16}
      fill="#FFF"
    >
      <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
    </svg>
  );
};

const AngleDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={16}
      fill="#FFF"
    >
      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
    </svg>
  );
};

const Navigationbar = ({ isOpen }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <motion.nav
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-[100vw] fixed bottom-0 h-[80vh] bg-[#FF5D00] shadow-2xl p-6 flex flex-col text-white"
    >
      <ul className="space-y-4">
        {/* Expandable Menu - Buy */}
        <li>
          <button
            onClick={() => toggleExpand("buy")}
            className={`w-full flex justify-between items-center text-lg ${
              expanded === "rent" ? "border-0" : "border-b-[1px]"
            } `}
          >
            <div className="flex gap-2">
              <HomeIcon />
              Buy
            </div>

            <span>
              {expanded === "buy" ? <AngleUpIcon /> : <AngleDownIcon />}
            </span>
          </button>
          <AnimatePresence>
            {expanded === "buy" && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 py-2 space-y-3 border-b-[1px]"
              >
                {variables.type.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Expandable Menu - Rent */}
        <li>
          <button
            onClick={() => toggleExpand("rent")}
            className={`w-full flex justify-between items-center text-lg ${
              expanded === "rent" ? "border-0" : "border-b-[1px]"
            } `}
          >
            <div className="flex gap-2">
              <KeyIcon />
              Rent
            </div>
            <span>
              {expanded === "rent" ? <AngleUpIcon /> : <AngleDownIcon />}
            </span>
          </button>
          <AnimatePresence>
            {expanded === "rent" && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 py-2 space-y-3 space-y-2 border-b-[1px]"
              >
                {variables.type.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Static Menu Items */}
        <li className="text-lg border-b-[1px]">
          <div className="flex gap-2">
            <BedIcon />
            PG
          </div>
        </li>
        <li className="text-lg border-b-[1px]">Find an Agent</li>
        <li className="text-lg border-b-[1px]">About</li>
        <li className="text-lg border-b-[1px]">Help</li>
      </ul>
    </motion.nav>
  );
};

export default Navigationbar;
