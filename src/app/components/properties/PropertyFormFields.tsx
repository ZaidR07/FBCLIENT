"use client";

import Select from "react-select";

interface PropertyTypeFieldProps {
  value: string;
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCategoryChange?: (category: number) => void;
}

export const PropertyTypeField = ({ value, options, onChange, onCategoryChange }: PropertyTypeFieldProps) => {
  return (
    <div className="mb-4">
      <label>
        Property Type <span className="text-red-700">*</span>
      </label>
      <select
        name="type"
        value={value}
        onChange={(e) => {
          onChange(e);
          if (onCategoryChange) {
            const selectedOption = options.find(
              (item) => item.name === e.target.value
            );
            if (selectedOption) {
              onCategoryChange(selectedOption.category);
            }
          }
        }}
        className="border-b-2 border-black w-full mt-3"
        required
      >
        <option value="">Select Type</option>
        {options?.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

interface BedroomsFieldProps {
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BedroomsField = ({ value, options, onChange }: BedroomsFieldProps) => {
  return (
    <div className="mb-4">
      <label>
        Bedrooms <span className="text-red-700 text-xl">*</span>
      </label>
      <div className="flex flex-wrap gap-3 mt-2">
        {options.map((option, index) => (
          <label key={index} className="flex gap-2 items-center">
            <input
              type="radio"
              name="bedrooms"
              value={option}
              checked={value === option}
              onChange={onChange}
              required
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface AreaFieldProps {
  area: string;
  areaunits: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const AreaField = ({ area, areaunits, onChange }: AreaFieldProps) => {
  return (
    <div className="mb-4">
      <label>
        Area <span className="text-red-700 text-xl">*</span>
      </label>
      <div className="flex gap-3 items-center">
        <input
          name="area"
          value={area}
          onChange={onChange}
          type="number"
          className="border-b-2 border-black w-full mt-1"
          placeholder="Enter area"
          required
        />
        <select
          name="areaunits"
          value={areaunits}
          onChange={onChange}
          className="border-b-2 border-black px-2 py-1"
          required
        >
          <option value="">Select</option>
          <option value="sqft">Sq. Ft</option>
          <option value="sqmt">Sq. Mt</option>
          <option value="acre">Acre</option>
          <option value="guntha">Guntha</option>
          <option value="hectare">Hectare</option>
        </select>
      </div>
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[] | number[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export const SelectField = ({ label, name, value, options, onChange, required = false }: SelectFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="">
        {label} {required && <span className="text-red-700 text-xl">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border-b-2 border-black px-2 py-1 w-full"
        required={required}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

interface LocationFieldProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const LocationField = ({ value, options, onChange }: LocationFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="">
        Location <span className="text-red-600">*</span>
      </label>
      <Select
        options={options.map((item, index) => ({
          value: item,
          label: item,
          key: index,
        }))}
        isSearchable
        value={value ? { value: value, label: value } : null}
        onChange={(selectedOption) => onChange(selectedOption?.value || "")}
        placeholder="Select a location..."
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#fff",
            borderColor: "#FF5D00",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#FF5D00",
            },
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#FF5D00",
          }),
          option: (baseStyles, { isSelected, isFocused }) => ({
            ...baseStyles,
            backgroundColor: isSelected
              ? "#FF5D00"
              : isFocused
              ? "#FFD3B6"
              : "#fff",
            color: isSelected ? "#fff" : "#000",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #FF5D00",
          }),
        }}
      />
    </div>
  );
};

interface HighlightsFieldProps {
  highlights: string[];
  highlightInput: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const HighlightsField = ({
  highlights,
  highlightInput,
  onInputChange,
  onAdd,
  onRemove,
}: HighlightsFieldProps) => {
  return (
    <div className="mb-4">
      <label>Highlights</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={highlightInput}
          onChange={(e) => onInputChange(e.target.value)}
          className="border-b-2 mt-2 border-black w-full"
          placeholder="Add a highlight..."
        />
        <button
          type="button"
          onClick={onAdd}
          className="bg-[#FF5D00] text-white px-3 py-1 rounded-md"
        >
          Add
        </button>
      </div>
      <ul className="mt-2">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md mt-1"
          >
            {highlight}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 text-sm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface AmenitiesFieldProps {
  selected: string[];
  options: string[];
  onChange: (amenities: string[]) => void;
}

export const AmenitiesField = ({ selected, options, onChange }: AmenitiesFieldProps) => {
  return (
    <div className="mb-4">
      <label>
        Amenities <span className="text-red-700">*</span>
      </label>
      <div className="flex flex-wrap gap-4 mt-4">
        {options.map((item, index) => {
          const isSelected = selected.includes(item);
          return (
            <button
              type="button"
              key={index}
              onClick={() => {
                onChange(
                  isSelected
                    ? selected.filter((amenity) => amenity !== item)
                    : [...selected, item]
                );
              }}
              className={`p-2 flex items-center gap-2 rounded-xl ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <span>{item}</span>
              {isSelected ? (
                <span className="text-2xl">-</span>
              ) : (
                <span className="text-2xl">+</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
