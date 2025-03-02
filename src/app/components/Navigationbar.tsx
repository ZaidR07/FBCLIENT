"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { uri } from "@/constant";

const Navigationbar = ({ isOpen }) => {
  const [expanded, setExpanded] = useState(null);
  const [variables, setVariables] = useState({});
  const router = useRouter(); // Initialize router

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleNavigation = (path) => {
    router.push(path); // Navigate to the provided path
  };

  const handleload = async () => {
    try {
      const response = await axios.get(`${uri}getvariables`);
      if (response.status === 200) {
        setVariables(response.data.payload);
      }
    } catch (error) {
      console.error("Failed to load variables:", error);
    }
  };

  useEffect(() => {
    handleload();
  }, []);

  return (
    <motion.nav
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-[100vw] pt-16 fixed bottom-0 h-[88vh] bg-[#FF5D00] shadow-2xl p-6 flex flex-col text-white"
    >
      <ul className="space-y-4">
        {/* Buy Section */}
        <li>
          <button
            onClick={() => toggleExpand("buy")}
            className="w-full flex justify-between items-center text-lg border-b-[1px]"
          >
            <div className="flex gap-2">🏠 Buy</div>
            <span>{expanded === "buy" ? "▲" : "▼"}</span>
          </button>
          <AnimatePresence>
            {expanded === "buy" && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 py-2 space-y-3 border-b-[1px]"
              >
                {variables.propertytypelist?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm cursor-pointer hover:text-gray-300"
                    onClick={() => handleNavigation(`/buyproperties?type=${item}&view=buy`)}
                  >
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Rent Section */}
        <li>
          <button
            onClick={() => toggleExpand("rent")}
            className="w-full flex justify-between items-center text-lg border-b-[1px]"
          >
            <div className="flex gap-2">🔑 Rent</div>
            <span>{expanded === "rent" ? "▲" : "▼"}</span>
          </button>
          <AnimatePresence>
            {expanded === "rent" && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-6 py-2 space-y-3 border-b-[1px]"
              >
                {variables.propertytypelist?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm cursor-pointer hover:text-gray-300"
                    onClick={() => handleNavigation(`/buyproperties?type=${item}&view=rent`)}
                  >
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Static Navigation Links */}
        <li
          className="text-lg border-b-[1px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation("/buyproperties?view=pg")}
        >
          🛏️ PG
        </li>
        <li
          className="text-lg border-b-[1px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation("/find-agent")}
        >
          👨‍💼 Find an Agent
        </li>
        <li
          className="text-lg border-b-[1px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation("/about")}
        >
          ℹ️ About
        </li>
        <li
          className="text-lg border-b-[1px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation("/help")}
        >
          🆘 Help
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navigationbar;
