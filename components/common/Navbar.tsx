import React from "react";
import logo from "../../assets/Logo.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="sticky h-16">
      <header className="text-gray-600 body-font bg-[#393232] fixed w-full z-10">
        <div className="mx-auto justify-between flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src={logo} alt="logo" width="97" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
