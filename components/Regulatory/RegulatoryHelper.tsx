export const columns = [
  {
    id: 0,
    title: "Authoritative Body",
    key: "authoritativeBody",
  },
  {
    id: 1,
    title: "Regulation Name",
    key: "regulationName",
  },
  {
    id: 2,
    title: "Regulatory language",
    key: "regulatoryLanguage",
  },
  {
    id: 3,
    title: "Translation",
    key: "translation",
  },
  {
    id: 4,
    title: "Governance-related",
    key: "governanceRelated",
  },
  {
    id: 5,
    title: "Additional Comments",
    key: "comments",
  },
];

export type RegulatoryFormValues = {
  authoritativeBody: string;
  regulationName: string;
  regulatoryLanguage: string;
  translation: string;
  governanceRelated: boolean;
  comments: string;
  authoritativeBodyId?: any;
};

export type formTypes = {
  getFormsData?: any;
  values: RegulatoryFormValues;
  setAuthoritativeId?: any;
  setSelectedValue?: any;
  selectedValue?: string;
};

export const initialValues: RegulatoryFormValues = {
  comments: "",
  authoritativeBody: "",
  regulatoryLanguage: "",
  translation: "",
  governanceRelated: false,
  regulationName: "",
  authoritativeBodyId: "",
};
