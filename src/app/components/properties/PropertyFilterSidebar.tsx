"use client";

import { AngleDownIcon } from "@/app/Icons";

interface FilterSidebarProps {
  isOpen: boolean;
  appliedFilters: any[];
  variables: any;
  constructionstatusvalues: string[];
  purchasetypevalues: string[];
  bathroomvalues: string[];
  balconyvalues: string[];
  postedbyValues: string[];
  amenitiesvalues: string[];
  furnishingstatusValues: string[];
  range: number[];
  propertiesList: any[];
  onRemoveFilter: (filter: any) => void;
  onConstructionStatusChange: (values: string[]) => void;
  onPurchaseTypeChange: (values: string[]) => void;
  onBathroomChange: (values: string[]) => void;
  onBalconyChange: (values: string[]) => void;
  onPostedByChange: (values: string[]) => void;
  onAmenitiesChange: (values: string[]) => void;
  onFurnishingChange: (values: string[]) => void;
  onRangeChange: (range: number[]) => void;
  onReset: () => void;
  onClose: () => void;
}

const bathrooms = ["1", "2", "3", "4", "5"];
const balconies = ["1", "2", "3", "4", "5"];

export const PropertyFilterSidebar = ({
  isOpen,
  appliedFilters,
  variables,
  constructionstatusvalues,
  purchasetypevalues,
  bathroomvalues,
  balconyvalues,
  postedbyValues,
  amenitiesvalues,
  furnishingstatusValues,
  range,
  propertiesList,
  onRemoveFilter,
  onConstructionStatusChange,
  onPurchaseTypeChange,
  onBathroomChange,
  onBalconyChange,
  onPostedByChange,
  onAmenitiesChange,
  onFurnishingChange,
  onRangeChange,
  onReset,
  onClose,
}: FilterSidebarProps) => {
  return (
    <div
      className={`w-[65%] lg:w-[30%] max-h-[55vh] lg:max-h-[70vh] bg-[#fff] fixed rounded-2xl mt-[12vh] lg:mt-[5vh] z-30 lg:z-0 pl-[8%] pr-4 lg:px-[2%] py-5 border-2 border-[#f3701f] lg:border-gray-300 transition-transform duration-500 ease-in-out overflow-y-scroll 
    lg:translate-x-[5%] ${
      isOpen ? "translate-x-[-10%]" : "-translate-x-full"
    }`}
    >
      {/* Applied Filters */}
      {appliedFilters && appliedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <h1 className="text-lg font-semibold">Applied Filters :</h1>
          {appliedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded-lg px-3 py-1 text-sm"
            >
              <span>
                <span className="text-orange-600">{filter.label} : </span>
                {filter.value}
              </span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="ml-2 text-red-600 md:text-base lg:text-lg hover:text-red-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Construction Status */}
      <div>
        <div className="flex gap-3">
          <span className="font-semibold text-lg">Construction Status</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {variables.constructionstatuslist &&
          variables.constructionstatuslist.length > 0 &&
          variables.constructionstatuslist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                value={item}
                checked={constructionstatusvalues.includes(item)}
                onChange={(e) => {
                  onConstructionStatusChange(
                    constructionstatusvalues.includes(item)
                      ? constructionstatusvalues.filter((val) => val !== item)
                      : [...constructionstatusvalues, item]
                  );
                }}
              />
              <span>{item}</span>
            </div>
          ))}
      </div>

      {/* Purchase Type */}
      <div>
        <div className="mt-4 flex gap-3">
          <span className="font-semibold text-lg">Purchase Type</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {variables.purchasetypelist &&
          variables.purchasetypelist.length > 0 &&
          variables.purchasetypelist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                value={item}
                checked={purchasetypevalues.includes(item)}
                onChange={(e) => {
                  onPurchaseTypeChange(
                    purchasetypevalues.includes(item)
                      ? purchasetypevalues.filter((val) => val !== item)
                      : [...purchasetypevalues, item]
                  );
                }}
              />
              <span>{item}</span>
            </div>
          ))}
      </div>

      {/* Area */}
      <div className="mt-4">
        <div className="flex gap-3 items-center">
          <span className="font-semibold text-lg">Area</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={range[1]}
          className="w-full mt-2"
          onChange={(e) => onRangeChange([range[0], Number(e.target.value)])}
        />
        <div className="flex justify-evenly items-center mt-2">
          <input
            type="number"
            value={range[0]}
            className="border p-2 w-16 text-center"
            onChange={(e) => onRangeChange([Number(e.target.value), range[1]])}
          />
          <input
            type="number"
            value={range[1]}
            className="border p-2 w-16 text-center"
            onChange={(e) => onRangeChange([range[0], Number(e.target.value)])}
          />
          <span>
            {propertiesList.length > 0 && propertiesList[0].areaunits}
          </span>
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <div className="mt-4 flex gap-3">
          <span className="font-semibold text-lg">Bathrooms</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {bathrooms.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="checkbox"
              value={item}
              checked={bathroomvalues.includes(item)}
              onChange={(e) => {
                onBathroomChange(
                  bathroomvalues.includes(item)
                    ? bathroomvalues.filter((val) => val !== item)
                    : [...bathroomvalues, item]
                );
              }}
            />
            <span>
              {item != "1" ? `${item} Bathrooms` : `${item} Bathroom`}
            </span>
          </div>
        ))}
      </div>

      {/* Balconies */}
      <div>
        <div className="mt-4 flex gap-3">
          <span className="font-semibold text-lg">Balconies</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {balconies.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="checkbox"
              value={item}
              checked={balconyvalues.includes(item)}
              onChange={(e) => {
                onBalconyChange(
                  balconyvalues.includes(item)
                    ? balconyvalues.filter((val) => val !== item)
                    : [...balconyvalues, item]
                );
              }}
            />
            <span>
              {item != "1" ? `${item} Balconies` : `${item} Balcony`}
            </span>
          </div>
        ))}
      </div>

      {/* Posted By */}
      <div>
        <div className="mt-4 flex gap-3">
          <span className="font-semibold text-lg">Posted By</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {variables.postedbylist &&
          variables.postedbylist.length > 0 &&
          variables.postedbylist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                value={item}
                checked={postedbyValues.includes(item)}
                onChange={(e) => {
                  onPostedByChange(
                    postedbyValues.includes(item)
                      ? postedbyValues.filter((val) => val !== item)
                      : [...postedbyValues, item]
                  );
                }}
              />
              <span>{item}</span>
            </div>
          ))}
      </div>

      {/* Amenities */}
      <div>
        <div className="mt-4 flex gap-3">
          <span className="font-semibold text-lg">Amenities</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {variables.amenitieslist &&
          variables.amenitieslist.length > 0 &&
          variables.amenitieslist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                value={item}
                checked={amenitiesvalues.includes(item)}
                onChange={(e) => {
                  onAmenitiesChange(
                    amenitiesvalues.includes(item)
                      ? amenitiesvalues.filter((val) => val !== item)
                      : [...amenitiesvalues, item]
                  );
                }}
              />
              <span>{item}</span>
            </div>
          ))}
      </div>

      {/* Furnishing Status */}
      <div>
        <div className="mt-4 flex gap-3">
          <span className="font-semibold text-lg">Furnishing Status</span>
          <AngleDownIcon width={20} fill="#000" />
        </div>
        {variables.furnishingstatuslist &&
          variables.furnishingstatuslist.length > 0 &&
          variables.furnishingstatuslist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                value={item}
                checked={furnishingstatusValues.includes(item)}
                onChange={(e) => {
                  onFurnishingChange(
                    furnishingstatusValues.includes(item)
                      ? furnishingstatusValues.filter((val) => val !== item)
                      : [...furnishingstatusValues, item]
                  );
                }}
              />
              <span>{item}</span>
            </div>
          ))}
      </div>

      {/* Filter and Reset Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onReset}
          className="border-[#f3701f] border-2 py-2 px-4 rounded-xl text-[#f3701f]"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="bg-[#f3701f] py-2 px-4 rounded-xl text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};
