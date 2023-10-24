import StepsBox from "../common/StepsBox";

export const stepsColumns = [
  {
    id: 0,
    title: "Id",
    key: "id",
  },
  {
    id: 1,
    title: "Name",
    key: "name",
  },

  {
    id: 2,
    title: "Stage",
    key: "stage",
    cell: (data: any) => data.name,
  },
];

export const columns = [
  {
    id: 0,
    title: "Stages",
    key: "name",
  },
  {
    id: 2,
    title: "Steps",
    key: "mlOpsSteps",
    cell: (data: any) => <StepsBox data={data} />,
  },
];

export const initialStageValues: initialStageValuesTypes = {
  name: "",
  description: "",
};
export const initialStepValues: initialStepValuesTypes = {
  name: "",
  description: "",
  stageId: "",
};

export type initialStageValuesTypes = {
  name: string;
  description: string;
};
export type initialStepValuesTypes = {
  name: string;
  description: string;
  stageId: string;
};

export type formTypes = {
  getFormsData: any;
  showStages?: boolean;
  values: initialStageValuesTypes;
};
