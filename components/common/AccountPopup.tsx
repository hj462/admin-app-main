import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const AccountPopup = () => {
  return (
    <div className="bg-white w-44 shadow-md p-1 rounded-md">
      <Link href="/geography">
        <h2 className="font-semibold text-sm leading-5 text-[#464F60] p-3 cursor-pointer">
          Change Geography
        </h2>
      </Link>
      <h2
        onClick={() => signOut()}
        className="font-semibold text-sm leading-5 text-[#464F60] p-3 cursor-pointer"
      >
        Sign Out
      </h2>
    </div>
  );
};

export default AccountPopup;
