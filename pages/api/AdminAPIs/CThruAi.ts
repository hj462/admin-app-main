import axiosInstance from "./index";

export const GetCThruData = async (start?: any, count?: any) => {
  const response = await axiosInstance.get(
    `cthru-airegulations?start=${start}&count=${count}`
  );
  return response.data;
};
export const AddCThruData = async (data: any) => {
  const response = await axiosInstance.post("cthru-airegulations", data);
  return response.data;
};
export const GetCThruDataById = async (id: any) => {
  const response = await axiosInstance.get(`cthru-airegulations/${id}`);
  return response.data;
};
export const UpdateCthruAi = async (id: number, data: any) => {
  const response = await axiosInstance.patch(`cthru-airegulations/${id}`, data);
  return response.data;
};
export const DeleteCthruAi = async (id: any) => {
  const response = await axiosInstance.delete(`cthru-airegulations/${id}`);
  return response.data;
};
