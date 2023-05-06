import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
