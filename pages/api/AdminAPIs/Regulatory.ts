import { GetFromStorage } from "../../../components/utils/Common";
import axiosInstance from "./index";

export const GetRegulatory = async (geoId?: any, start?: any, count?: any) => {
  if (geoId.includes("All")) {
    const response = await axiosInstance.get(
      `reg-requirements?start=${start}&count=${count}`
    );
    return response.data;
  } else {
    const response = await axiosInstance.get(
      `reg-requirements?start=${start}&count=${count}&geoId=${geoId}`
    );
    return response.data;
  }
};

export const AddRegulatory = async (data: any) => {
  const response = await axiosInstance.post("reg-requirements", data);
  return response.data;
};

export const GetRegulatoryById = async (id: number) => {
  const response = await axiosInstance.get(`reg-requirements/${id}`);
  return response.data;
};

export const UpdateRegulatory = async (id: number, data: any) => {
  const response = await axiosInstance.patch(`reg-requirements/${id}`, data);
  return response.data;
};

export const DeleteRegulatory = async (id: any) => {
  const response = await axiosInstance.delete(`reg-requirements/${id}`);
  return response.data;
};

export const GetAuthoritativeBody = async () => {
  const response = await axiosInstance.get("authoritative-bodies");
  return response.data;
};
