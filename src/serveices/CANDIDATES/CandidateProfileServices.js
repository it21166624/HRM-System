import axios from "axios";

const getProfile = async (reg_id) => {
  let config = {
    method: "get",
    url: "Candidate/User/GetUserDetails",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  getProfile,
};
