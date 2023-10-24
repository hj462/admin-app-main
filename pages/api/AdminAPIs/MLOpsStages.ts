import axiosInstance from "./index";

export const GetAllStages = async () => {
  const response = await axiosInstance.get("ml-ops-stages");
  return response.data;
};
export const AddStage = async (data: any) => {
  const response = await axiosInstance.post("ml-ops-stages", data);
  return response.data;
};

export const GetSingleStage = async (id: any) => {
  const response = await axiosInstance.get(`ml-ops-stages/${id}`);
  return response.data;
};

export const UpdateStage = async (id: any, data: any) => {
  const response = await axiosInstance.patch(`ml-ops-stages/${id}`, data);
  return response.data;
};

export const DeleteStage = async (id: any) => {
  const response = await axiosInstance.delete(`ml-ops-stages/${id}`);
  return response.data;
};
