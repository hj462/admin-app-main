import React from "react";
import Button from "../common/Button";
import Sidebar from "../common/Sidebar";
import DashboradNavbar from "../common/DashboardNavbar";
import RadioButton from "../common/RadioButton";
import { useRouter } from "next/router";
import { SaveToStorage } from "../utils/Common";

const Geography = ({ geographyData }: any) => {
  const router = useRouter();
  const onHandleChange = (data: any) => {
    const Geography = data.split(",");
    const selectedId = Geography[0];
    const selectedGeography = Geography[1];
    SaveToStorage("geography", selectedGeography);
    SaveToStorage("geographyId", selectedId);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <DashboradNavbar />
      </div>
      <section className="flex justify-center pt-20">
        <div className="w-[575px]">
          <h2 className="font-medium text-2xl text-[#393232]">
            Which of the following regulatory geographies will you be working
            on?
          </h2>
          <div>
            {geographyData?.map((item: any) => (
              <RadioButton
                key={item.id}
                label={item.name}
                value={`${item.id} , ${item.name}`}
                id={item.name}
                name="geography"
                onChange={(event: any) => onHandleChange(event.target.value)}
              />
            ))}
            <RadioButton
              label="All"
              value={`${"All"} , ${"All"}`}
              id="All"
              name="geography"
              onChange={(event: any) => onHandleChange(event.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              title="Next"
              data-testid="submit-button"
              className="w-20 h-9 bg-[#C8B568] text-white"
              onClick={() => router.push("/regulatory")}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Geography;
