import axios from "axios";
const StaffServices = async () => {
  const url = `Staff/Dashboard/GetDashboardDetails`;

  const config = {
    method: "get",
    url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  StaffServices,
};
