import React from "react";

type inputTypes = {
  placeholder?: string;
  type?: string;
  onChange?: () => void;
  id?: string;
  label?: string;
  name?: string;
  value?: string;
};

const Input = ({
  type,
  placeholder,
  onChange,
  id,
  label,
  name,
  value,
}: inputTypes) => {
  return (
    <>
      <label
        className="leading-5 text-sm font-medium text-[#464F60]"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className="w-full text-sm bg-white h-8 mb-4 mt-1 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </>
  );
};

export default Input;
