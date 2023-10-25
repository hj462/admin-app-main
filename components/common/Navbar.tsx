import React from "react";

const Navbar = () => {
  return (
    <div className="sticky h-16">
      <header className="text-gray-600 body-font bg-[#393232] fixed w-full z-10">
        <div className="mx-auto justify-between flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <h2 className="text-white">Home</h2>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
