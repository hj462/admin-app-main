import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import AccountPopup from "./AccountPopup";
import avatar from "../../assets/avatar.png";
import { Context } from "../hooks/geographyContext";

type navbarTypes = {
  pageTitle?: string;
};

const DashboardNavbar = ({ pageTitle }: navbarTypes) => {
  const [accountPopup, setAccountPopup] = useState(false);
  const { data: session } = useSession();
  const handlePopup = () => {
    setAccountPopup(!accountPopup);
  };

  const { geography } = useContext(Context);

  return (
    <div
      className={
        pageTitle
          ? "h-16 border-b border-b-[#e2e2e2] w-full px-5 flex justify-between items-center"
          : "h-16 border-b border-b-[#e2e2e2] w-full px-5 flex justify-end items-center"
      }
    >
      {pageTitle && (
        <div>
          <h2 className="text-2xl text-[#393232] font-medium">{pageTitle}</h2>
          <h2 className="text-sm text-[#393232] font-medium">{geography}</h2>
        </div>
      )}

      <div className="flex items-center w-52 justify-between">
        <div>
          <h2 className="text-sm font-normal text-right text-[#393232]">
            {session?.user?.name}
          </h2>
          <p className="text-xs font-normal text-[#868FA0]">
            {session?.user?.email}
          </p>
        </div>
        <div
          onClick={handlePopup}
          className="w-9 h-9 rounded-full cursor-pointer"
        >
          <Image
            src={session?.user?.image || avatar}
            alt="avatar"
            width={35}
            height={35}
            className="rounded-full border-2 border-[#C8B568]"
          />
        </div>
        {accountPopup && (
          <div className="absolute top-16 right-6">
            <AccountPopup />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
