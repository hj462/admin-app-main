import axiosInstance from "./index";

export const GetMapping = async (start: any, count: any) => {
  const response = await axiosInstance.get(
    `cthru-airegulations/mappings?start=${start}&count=${count}`
  );
  return response.data;
};

export const AddMapping = async (id: any, data: any) => {
  const response = await axiosInstance.patch(
    `cthru-airegulations/${id}/map`,
    data
  );
  return response.data;
};
