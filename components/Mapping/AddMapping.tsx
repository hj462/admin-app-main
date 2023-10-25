import React from "react";
import { addMappingTypes } from "./MappingHelper";
import RegulationForm from "./RegulationForm";

const AddRegulationMapping = ({
  setShowAll,
  multiDropdownValues,
  getID,
  essentialId,
  setEssentialId,
  regulationIds,
  setRegulationIds,
  addMapping,
}: addMappingTypes) => {
  return (
    <div>
      <div className="flex">
        <div className="w-full">
          <div className={getID ? "" : "py-5 px-5"}>
            <RegulationForm
              setShowAll={setShowAll}
              multiDropdownValues={multiDropdownValues}
              getID={getID}
              essentialId={essentialId}
              setEssentialId={setEssentialId}
              regulationIds={regulationIds}
              setRegulationIds={setRegulationIds}
              addMapping={addMapping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRegulationMapping;
