import React from "react";

type buttonInterface = {
  title: string;
  className: string;
  onClick?: () => void;
  onRef?: React.RefObject<any>;
  disable?: boolean;
};

const Button = ({
  title,
  onClick,
  className,
  onRef,
  disable,
}: buttonInterface) => {
  return (
    <button
      className={
        disable
          ? `cursor-not-allowed h-8 px-5 bg-[#F8F9FA] text-[#212529] rounded-md font-normal text-base`
          : `rounded-md h-8 px-5 font-normal text-base  ${className}`
      }
      onClick={onClick}
      ref={onRef}
      disabled={disable}
      data-testid="submit-button"
    >
      {title}
    </button>
  );
};

export default Button;
