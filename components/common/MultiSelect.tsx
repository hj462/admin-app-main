import Image from "next/image";
import React from "react";
import closeIcon from "../../assets/close.png";
import Loader from "./Loader";

type MultiSelectTypes = {
  data: Array<string>;
  setSelectIDs: (value: Array<number>) => void;
  selectIDs: Array<number>;
  disable?: boolean;
  isLoading?: boolean;
};

const MultiSelect = ({
  data,
  setSelectIDs,
  selectIDs = [],
  disable,
  isLoading,
}: MultiSelectTypes) => {
  const getSelected = (e: any) => {
    if (e.target.checked) {
      setSelectIDs([...selectIDs, parseInt(e.target.value)]);
    } else {
      const filteredIds = selectIDs.splice(
        selectIDs.indexOf(parseInt(e.target.value)),
        1
      );
      setSelectIDs([...selectIDs]);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data?.map((item: any, idx: any) => (
            <label
              key={idx}
              className={`
                ${
                  disable
                    ? " transition-all duration-200 PillList-item border-2 cursor-not-allowed rounded-3xl opacity-100"
                    : "transition-all duration-200 opacity-100 ease-in-out delay-150 PillList-item cursor-pointer border-2 rounded-3xl border-[#C8B568]"
                }`}
            >
              <input
                type="checkbox"
                value={item.id}
                onChange={getSelected}
                disabled={disable}
                checked={selectIDs.includes(item.id)}
              />
              <span className="PillList-label transition duration-300 opacity-100 ease-in-out delay-100">
                {item.regulationName}
                <span className="Icon Icon--checkLight Icon--smallest transition duration-300 opacity-100 ease-in-out delay-100">
                  <Image src={closeIcon} alt="close" className="mt-[2px]" />
                </span>
              </span>
            </label>
          ))}
        </>
      )}
    </div>
  );
};

export default MultiSelect;
