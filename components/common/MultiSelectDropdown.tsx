import React from "react";
import Select from "react-select";

type dropdownTypes = {
  options: Array<string>;
  setValue: any;
  value?: Array<string>;
  disable?: boolean;
};

const MultiSelectDropdown = ({
  options,
  setValue,
  value,
  disable,
}: dropdownTypes) => {
  return (
    <>
      <Select
        isMulti
        name="Options"
        options={options}
        className="basic-multi-select mb-4 w-full"
        classNamePrefix="select"
        onChange={setValue}
        isSearchable
        value={value}
        isDisabled={disable}
      />
    </>
  );
};

export default MultiSelectDropdown;
