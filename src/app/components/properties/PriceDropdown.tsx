"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PriceDropdownProps {
  onApply: (range: [number, number]) => void;
}

export const PriceDropdown = ({ onApply }: PriceDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000);

  return (
    <div className="relative">
      <button
        className="border-2 border-gray-300 bg-white rounded-lg px-2 py-2 min-w-[15%] text-left text-gray-700 focus:ring-2 focus:ring-[#f3701f] flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        Price
        <span className="ml-2">▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute min-w-[200px] bg-white border-2 border-gray-300 mt-1 rounded-lg shadow-lg z-30 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="minPrice" className="text-sm font-medium">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="border p-2 rounded-lg"
                  placeholder="Min Price"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="maxPrice" className="text-sm font-medium">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="border p-2 rounded-lg"
                  placeholder="Max Price"
                />
              </div>

              <button
                onClick={() => {
                  onApply([minPrice, maxPrice]);
                  setIsOpen(false);
                }}
                className="bg-[#f3701f] text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
