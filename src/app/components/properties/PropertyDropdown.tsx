"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyDropdownProps {
  label: string;
  options: any[];
  selected: string;
  onSelect: (value: string) => void;
}

export const PropertyDropdown = ({ label, options, selected, onSelect }: PropertyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="border-2 border-gray-300 bg-white rounded-lg px-2 py-2 min-w-[15%] text-left text-gray-700 focus:ring-2 focus:ring-[#f3701f] flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || label}
        <span className="ml-2">▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute  bg-white border-2 border-gray-300 mt-1 rounded-lg shadow-lg z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option, index) =>
              label === "Type" ? (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    onSelect(option.name);
                    setIsOpen(false);
                  }}
                >
                  {option.name}
                </li>
              ) : (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
