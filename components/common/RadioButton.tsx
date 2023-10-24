import React from "react";

type radioTypes = {
  id: string;
  name: string;
  value: string;
  onChange?: (event: any) => void;
  label: string;
};

const RadioButton = ({ id, name, onChange, value, label }: radioTypes) => {
  return (
    <div className="flex items-baseline my-4">
      <input
        type="radio"
        id={id}
        name={name}
        onChange={onChange}
        data-testid="radio-test"
        value={value}
        className="mr-2"
      />
      <label className="font-normal text-base text-[#212529]" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
