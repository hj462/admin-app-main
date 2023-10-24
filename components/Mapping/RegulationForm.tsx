import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { GetCThruData } from "../../pages/api/AdminAPIs/CThruAi";
import { GetRegulatory } from "../../pages/api/AdminAPIs/Regulatory";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import MultiSelect from "../common/MultiSelect";
import { GetFromStorage } from "../utils/Common";
import { addMappingTypes } from "./MappingHelper";

const RegulationForm = ({
  setShowAll,
  multiDropdownValues,
  getID,
  addMapping,
  cThruId,
  setcThruId,
  regulationIds,
  setRegulationIds,
}: addMappingTypes) => {
  const geoId = GetFromStorage("geographyId");
  const [startCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCThruValue, setSelectedCThruValue] = useState();

  const prefilDropdownValues = () => {
    if (multiDropdownValues) {
      setRegulationIds(
        multiDropdownValues[0]?.regRequirements.map(
          (regulation: any) => regulation.id
        )
      );
      setSelectedCThruValue(multiDropdownValues[0]?.key);
    }
  };

  useEffect(() => {
    prefilDropdownValues();
  }, [multiDropdownValues]);

  const { data: cThruAiData, isLoading } = useQuery({
    queryKey: ["cthruAi", startCount, rowsPerPage],
    queryFn: () => GetCThruData(startCount, rowsPerPage),
    refetchOnWindowFocus: true,
  });

  const { data: regulatoryData, isLoading: loading } = useQuery({
    queryKey: ["regulations", geoId],
    queryFn: () => GetRegulatory(geoId),
    staleTime: Infinity,
  });

  const handleScroll = (e: any) => {
    const scrollHeight = e.currentTarget.scrollHeight;
    const currentHeight = Math.ceil(
      e.currentTarget.scrollTop + e.currentTarget.offsetHeight
    );
    if (
      currentHeight + 1 >= scrollHeight &&
      cThruAiData?.pagination.totalCount > cThruAiData?.results.length
    ) {
      setRowsPerPage(rowsPerPage + 10);
    }
  };

  useEffect(() => {
    setcThruId(getID);
  }, [getID]);

  return (
    <div className={getID ? "flex flex-col" : "flex justify-around pt-3 pb-14"}>
      <div className="w-96 mr-2">
        <Dropdown
          label="C-Thru-Ai Requirements"
          options={cThruAiData?.results}
          getSelectedId={(e: any) => setcThruId(e)}
          disable={getID ? true : false}
          onScroll={handleScroll}
          isLoading={isLoading}
          setSelectedValue={setSelectedCThruValue}
          selectedValue={selectedCThruValue}
        />
      </div>
      <div className={getID ? "w-full mt-5" : "w-2/4"}>
        <p className="leading-5 text-sm font-medium text-[#464F60] mb-2">
          Select Regulatory Requirements
        </p>
        <div>
          <MultiSelect
            data={regulatoryData?.results}
            selectIDs={regulationIds}
            setSelectIDs={setRegulationIds}
            disable={cThruId == null ? true : false}
            isLoading={loading}
          />
        </div>
        {!getID && (
          <div className="flex gap-2 mt-7">
            <Button
              title="Add"
              className="bg-[#C8B568] text-white transition-all duration-200 opacity-100 ease-in-out delay-100"
              onClick={addMapping}
              disable={cThruId && regulationIds?.length > 0 ? false : true}
            />
            <Button
              title="Cancel"
              className=" bg-[#F8F9FA] text-[#212529]"
              onClick={() => setShowAll(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegulationForm;
