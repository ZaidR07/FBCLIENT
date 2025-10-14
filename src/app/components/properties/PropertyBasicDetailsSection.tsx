"use client";

import { PropertyTypeField, BedroomsField, AreaField, SelectField } from "./PropertyFormFields";

interface PropertyBasicDetailsSectionProps {
  formdata: any;
  variables: any;
  currentPropertytype: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPropertyTypeChange?: (category: number) => void;
}

export const PropertyBasicDetailsSection = ({
  formdata,
  variables,
  currentPropertytype,
  onChange,
  onPropertyTypeChange,
}: PropertyBasicDetailsSectionProps) => {
  return (
    <>
      <PropertyTypeField
        value={formdata.type}
        options={variables?.propertytypelist || []}
        onChange={onChange}
        onCategoryChange={onPropertyTypeChange}
      />

      {currentPropertytype === 1 && (
        <BedroomsField
          value={formdata.bedrooms}
          options={variables.bhklist || []}
          onChange={onChange}
        />
      )}

      <AreaField
        area={formdata.area}
        areaunits={formdata.areaunits}
        onChange={onChange}
      />

      {currentPropertytype === 1 && (
        <>
          <SelectField
            label="Bathrooms"
            name="bathrooms"
            value={formdata.bathrooms}
            options={["1", "2", "3", "4", "5", "6"]}
            onChange={onChange}
            required
          />

          <SelectField
            label="Balconies"
            name="balconies"
            value={formdata.balconies}
            options={["0", "1", "2", "3", "4", "5"]}
            onChange={onChange}
            required
          />
        </>
      )}

      <SelectField
        label="Facing"
        name="facing"
        value={formdata.facing}
        options={["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]}
        onChange={onChange}
        required
      />

      <SelectField
        label="Property Age"
        name="propertyage"
        value={formdata.propertyage}
        options={["0-1 years", "1-5 years", "5-10 years", "10+ years"]}
        onChange={onChange}
        required
      />

      <SelectField
        label="Construction Status"
        name="constructionstatus"
        value={formdata.constructionstatus}
        options={variables.constructionstatuslist || []}
        onChange={onChange}
        required
      />

      <SelectField
        label="Furnishing Status"
        name="furnishing"
        value={formdata.furnishing}
        options={variables.furnishingstatuslist || []}
        onChange={onChange}
        required
      />
    </>
  );
};
