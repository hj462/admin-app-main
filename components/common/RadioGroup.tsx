import React, { ChangeEvent } from "react";

type radioType = {
  firstLabel: string;
  secondLabel: string;
  firstId: string;
  secondId: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const RadioGroup = ({
  firstLabel,
  secondLabel,
  firstId,
  secondId,
  name,
  onChange,
  value,
}: radioType) => {
  return (
    <div className="mb-5 flex">
      <input
        type="checkbox"
        id={firstId}
        checked={value === "true"}
        name={name}
        onChange={(e) => {
          onChange(e);
        }}
        className="mr-2 h-5 w-5 cursor-pointer"
        value="true"
      />
      <label
        htmlFor={firstId}
        className="text-[#212529] text-base font-normal mr-3 cursor-pointer"
      >
        {firstLabel}
      </label>
      <input
        type="checkbox"
        id={secondId}
        checked={value === "false"}
        onChange={(e) => {
          onChange(e);
        }}
        name={name}
        value="false"
        className="mr-2 h-5 w-5 cursor-pointer"
      />
      <label
        htmlFor={secondId}
        className="text-[#212529] text-base font-normal cursor-pointer"
      >
        {secondLabel}
      </label>
    </div>
  );
};

export default RadioGroup;
