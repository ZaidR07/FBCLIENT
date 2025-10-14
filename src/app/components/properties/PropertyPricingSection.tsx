"use client";

import { SelectField } from "./PropertyFormFields";

interface PropertyPricingSectionProps {
  formdata: any;
  variables: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PropertyPricingSection = ({
  formdata,
  variables,
  onChange,
}: PropertyPricingSectionProps) => {
  return (
    <>
      {/* Price */}
      <div className="mb-4">
        <label>
          Price <span className="text-red-700 text-xl">*</span>
        </label>
        <input
          name="price"
          value={formdata.price}
          onChange={onChange}
          type="number"
          className="border-b-2 border-black w-full mt-1"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Line (Metro/Locality) */}
      <SelectField
        label="Metro Line / Locality"
        name="line"
        value={formdata.line}
        options={variables.linelist || []}
        onChange={onChange}
        required
      />
    </>
  );
};
