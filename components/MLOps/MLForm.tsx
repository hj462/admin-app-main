import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetAllStages } from "../../pages/api/AdminAPIs/MLOpsStages";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { formTypes } from "./MLOpsHelper";

const MLForm = ({ getFormsData, values, showStages }: formTypes) => {
  const { data: MLOpsStages } = useQuery({
    queryKey: ["mlStages"],
    queryFn: GetAllStages,
  });
  return (
    <>
      <h2 className="text-lg font-medium text-black mb-6 font-inter">
        Details
      </h2>
      <form>
        <Input
          label="Name"
          id="name"
          placeholder="Name"
          type="text"
          onChange={getFormsData}
          name="name"
          value={values?.name}
        />

        <TextArea
          label="Description"
          id="description"
          placeHolder="Description"
          name="description"
          onChange={getFormsData}
          value={values?.description}
        />
        {showStages && (
          <>
            <p className="leading-5 text-sm font-medium text-[#464F60] mb-2">
              Select Stage
            </p>
            <select
              onChange={getFormsData}
              name="stageId"
              className="rounded-md shadow-sm bg-white w-full h-8 border"
            >
              <option>...</option>
              {MLOpsStages?.map((item: any, idx: number) => (
                <option value={item.id} key={idx}>
                  {item.name}
                </option>
              ))}
            </select>
          </>
        )}
      </form>
    </>
  );
};

export default MLForm;
