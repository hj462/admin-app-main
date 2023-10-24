import axios from "./index";

export const GetAllGeopgraphies = async () => {
  const response = await axios.get("geographies");
  return response.data;
};
