import Image from "next/image";
import React from "react";
import deleteIcon from "../../assets/delete-icon-alert.png";

const Delete = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={deleteIcon} alt="delete" className="mb-3" />
      <p> Are you sure you want to delete this item?</p>
    </div>
  );
};

export default Delete;
