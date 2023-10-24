import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetAuthoritativeBody } from "../../pages/api/AdminAPIs/Regulatory";
import Dropdown from "../common/Dropdown";
import Input from "../common/Input";
import RadioGroup from "../common/RadioGroup";
import TextArea from "../common/TextArea";
import { formTypes } from "./RegulatoryHelper";

const RegulatoryForm = ({
  getFormsData,
  values,
  setAuthoritativeId,
  selectedValue,
  setSelectedValue,
}: formTypes) => {
  const { data: authoritativeBody, isLoading } = useQuery({
    queryKey: ["authoritative"],
    queryFn: GetAuthoritativeBody,
    refetchOnWindowFocus: true,
  });

  return (
    <>
      <form>
        <h2 className="text-lg font-medium text-black mb-6 font-inter">
          Details
        </h2>
        <Dropdown
          regulatory
          label="Authoritative Body"
          options={authoritativeBody}
          getSelectedId={(e: any) => setAuthoritativeId(e)}
          isLoading={isLoading}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
          className="mb-4"
        />
        <Input
          label="Regulation Name"
          id="regulation-name"
          placeholder="Regulation Name"
          type="text"
          onChange={getFormsData}
          name="regulationName"
          value={values?.regulationName}
        />
        <TextArea
          label="Regulatory Language"
          id="regulatory-language"
          placeHolder="Regulatory Language"
          name="regulatoryLanguage"
          onChange={getFormsData}
          value={values?.regulatoryLanguage}
        />
        <TextArea
          label="Translation"
          id="translation"
          placeHolder="Translation"
          name="translation"
          onChange={getFormsData}
          value={values?.translation}
        />
        <TextArea
          label="Additional Comments"
          id="additional-comments"
          placeHolder="Additional Comments"
          name="comments"
          onChange={getFormsData}
          value={values?.comments}
        />
        <div>
          <p className="leading-5 text-sm font-semibold text-[#464F60] mb-2">
            Governance Related
          </p>
          <RadioGroup
            firstId="yes"
            firstLabel="Yes"
            secondId="no"
            secondLabel="No"
            name="governanceRelated"
            onChange={getFormsData}
            value={values?.governanceRelated.toString()}
          />
        </div>
      </form>
    </>
  );
};

export default RegulatoryForm;
