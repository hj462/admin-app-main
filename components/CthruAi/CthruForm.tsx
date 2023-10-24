import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { GetAllSteps } from "../../pages/api/AdminAPIs/MLOpsSteps";
import Input from "../common/Input";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import TextArea from "../common/TextArea";
import { formType } from "./CthruAiHelper";

const CthruForm = ({
  getFormsData,
  values,
  setGetML,
  update = false,
}: formType) => {
  const [mlSteps, setMLSteps] = useState([]);

  const { data: allSteps } = useQuery({
    queryKey: ["allSteps"],
    queryFn: GetAllSteps,
    staleTime: Infinity,
  });

  const getStepIds = () => {
    const data = mlSteps?.map((item: any) => item.id);
    setGetML(data);
  };

  const preSelectedValues = () => {
    const value = values?.mlOpsSteps?.map((item: any) => {
      return { value: item.name, label: item.name, id: item.id };
    });
    setMLSteps(value);
  };

  useEffect(() => {
    preSelectedValues();
  }, [values]);

  useEffect(() => {
    getStepIds();
  }, [mlSteps]);

  return (
    <>
      <form>
        <h2 className="text-lg font-medium text-black mb-6 font-inter">
          Details
        </h2>
        <Input
          label="C-Thru-AI Requirement Key"
          id="c-thru-ai-requirement-key"
          placeholder="C-Thru-AI requirement Key"
          type="text"
          onChange={getFormsData}
          name="key"
          value={values?.key || ""}
        />
        <TextArea
          label="Requirement Description"
          id="requirement-description"
          placeHolder="Requirement Description"
          name="description"
          onChange={getFormsData}
          value={values?.description}
        />
        {update && (
          <>
            <p className="leading-5 text-sm font-medium text-[#464F60] mb-2">
              MLOps Steps
            </p>
            <MultiSelectDropdown
              setValue={setMLSteps}
              options={allSteps?.results.map((item: any) => {
                return { value: item.name, label: item.name, id: item.id };
              })}
              value={mlSteps}
            />
          </>
        )}
        <TextArea
          label="Comments"
          id="comments"
          placeHolder="Comments"
          name="comments"
          onChange={getFormsData}
          value={values?.comments}
        />
      </form>
    </>
  );
};

export default CthruForm;
