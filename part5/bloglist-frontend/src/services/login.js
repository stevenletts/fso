/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseurl = "/api/login";

const login = async (creditanls) => {
  const response = await axios.post(baseurl, creditanls);

  return response.data;
};

export default { login };
