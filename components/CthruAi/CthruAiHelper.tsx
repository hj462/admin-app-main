import StepsBox from "../common/StepsBox";

export const initialValues: CthruFormValues = {
  key: "",
  description: "",
  comments: "",
  mlOpsSteps: undefined,
};

export type CthruFormValues = {
  mlOpsSteps: any;
  key: string;
  description: string;
  comments: string;
};

export type formType = {
  getFormsData?: any;
  values: CthruFormValues;
  setGetML: any;
  update?: boolean;
};

export const columns = [
  {
    id: 0,
    title: "C-Thru-AI Requirement Key",
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
