import axiosInstance from "./index";

export const GetEssentialData = async (start?: any, count?: any) => {
  const response = await axiosInstance.get(
    `essentials?start=${start}&count=${count}`
  );
  return response.data;
};
export const AddEssentialData = async (data: any) => {
  const response = await axiosInstance.post("essentials", data);
  return response.data;
};
export const GetEssentialDataById = async (id: any) => {
  const response = await axiosInstance.get(`essentials/${id}`);
  return response.data;
};
export const UpdateEssentials = async (id: number, data: any) => {
  const response = await axiosInstance.patch(`essentials/${id}`, data);
  return response.data;
};
export const DeleteEssentials = async (id: any) => {
  const response = await axiosInstance.delete(`essentials/${id}`);
  return response.data;
};
