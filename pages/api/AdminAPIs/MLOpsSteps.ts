import axiosInstance from "./index";

export const AddStep = async (data: any) => {
  const response = await axiosInstance.post("mlops-steps", data);
  return response.data;
};

export const GetAllSteps = async () => {
  const response = await axiosInstance.get("mlops-steps");
  return response.data;
};

export const GetSteps = async (start: any, count: any) => {
  const response = await axiosInstance.get(
    `mlops-steps?start=${start}&count=${count}`
  );
  return response.data;
};

export const GetStepById = async (id: any) => {
  const response = await axiosInstance.get(`mlops-steps/${id}`);
  return response.data;
};

export const UpdateStep = async (id: any, data: any) => {
  const response = await axiosInstance.patch(`mlops-steps/${id}`, data);
  return response.data;
};

export const DeleteStep = async (id: any) => {
  const response = await axiosInstance.delete(`mlops-steps/${id}`);
  return response.data;
};
