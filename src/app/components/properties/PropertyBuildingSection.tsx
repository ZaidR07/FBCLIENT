"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyBuildingSectionProps {
  formdata: any;
  suggestions: any[];
  showSuggestions: boolean;
  selectedSuggestionIndex: number;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: any) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const PropertyBuildingSection = ({
  formdata,
  suggestions,
  showSuggestions,
  selectedSuggestionIndex,
  isFocused,
  onChange,
  onSuggestionClick,
  onKeyDown,
  onFocus,
  onBlur,
  inputRef,
}: PropertyBuildingSectionProps) => {
  return (
    <>
      {/* Society Name with Suggestions */}
      <div className="mb-4 relative">
        <label>
          Society / Building / Plot Name{" "}
          <span className="text-red-700 text-xl">*</span>
        </label>
        <motion.input
          ref={inputRef}
          name="Societyname"
          value={formdata.Societyname}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="border-b-2 border-black w-full mt-2"
          placeholder="Enter society or building name"
          required
          animate={{
            borderColor: isFocused ? "#FF5D00" : "#000",
          }}
          transition={{ duration: 0.3 }}
        />

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onMouseDown={() => onSuggestionClick(suggestion)}
                  className={`px-4 py-2 cursor-pointer ${
                    index === selectedSuggestionIndex
                      ? "bg-orange-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {suggestion.Societyname}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Floor */}
      <div className="mb-4">
        <label>
          Floor <span className="text-red-700 text-xl">*</span>
        </label>
        <input
          name="floor"
          value={formdata.floor}
          onChange={onChange}
          type="number"
          className="border-b-2 border-black w-full mt-1"
          placeholder="Enter floor number"
          required
        />
      </div>

      {/* Building Floors */}
      <div className="mb-4">
        <label>
          Total Floors in Building{" "}
          <span className="text-red-700 text-xl">*</span>
        </label>
        <input
          name="buildingfloors"
          value={formdata.buildingfloors}
          onChange={onChange}
          type="number"
          className="border-b-2 border-black w-full mt-1"
          placeholder="Enter total floors"
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label>
          Address <span className="text-red-700 text-xl">*</span>
        </label>
        <input
          name="address"
          value={formdata.address}
          onChange={onChange}
          className="border-b-2 border-black w-full mt-1"
          placeholder="Enter full address"
          required
        />
      </div>
    </>
  );
};
