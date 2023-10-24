import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type stepTypes = {
  data: Array<string>;
};

const StepsBox = ({ data }: stepTypes) => {
  return (
    <div className="flex flex-wrap relative">
      {data?.map((i: any, idx: number) => (
        <Tippy content={i.description} key={idx}>
          <p
            key={i.id}
            className="cursor-pointer px-3 py-1 mb-2 rounded-md mr-2 border border-[#C8B568] text-[#393232]"
          >
            {i.name}
          </p>
        </Tippy>
      ))}
    </div>
  );
};

export default StepsBox;
