import React from "react";

type textAreaTypes = {
  placeHolder: string;
  onChange: () => void;
  label: string;
  name: string;
  id: string;
  value?: string;
};

const TextArea = ({
  onChange,
  placeHolder,
  label,
  id,
  name,
  value,
}: textAreaTypes) => {
  return (
    <>
      <label
        className="leading-5 text-sm font-medium text-[#464F60] mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeHolder}
        className="w-full mb-4 mt-2 bg-white rounded-md border border-gray-300 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 outline-none text-gray-700 py-1 px-3  leading-6 transition-colors duration-200 ease-in-out"
        value={value || ""}
      />
    </>
  );
};

export default TextArea;
