import StepsBox from "../common/StepsBox";

export const initialValues: EssentialsFormValues = {
  key: "",
  description: "",
  comments: "",
  mlOpsSteps: undefined,
};

export type EssentialsFormValues = {
  mlOpsSteps: any;
  key: string;
  description: string;
  comments: string;
};

export type formType = {
  getFormsData?: any;
  values: EssentialsFormValues;
  setGetML: any;
  update?: boolean;
};

export const columns = [
  {
    id: 0,
    title: "Essentials Requirement Key",
    key: "key",
  },
  {
    id: 1,
    title: "Requirement Description",
    key: "description",
  },
  {
    id: 2,
    title: "MLOps Steps",
    key: "mlOpsSteps",
    cell: (data: Array<string>) => <StepsBox data={data} />,
  },
  {
    id: 3,
    title: "Comments",
    key: "comments",
  },
];
