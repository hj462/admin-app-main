import axiosInstance from "./index";

export const GetMapping = async (start: any, count: any) => {
  const response = await axiosInstance.get(
    `essential-airegulations/mappings?start=${start}&count=${count}`
  );
  return response.data;
};

export const AddMapping = async (id: any, data: any) => {
  const response = await axiosInstance.patch(
    `essential-airegulations/${id}/map`,
    data
  );
  return response.data;
};
