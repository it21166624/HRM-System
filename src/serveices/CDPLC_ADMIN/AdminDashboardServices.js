import axios from "axios";
const AdminServices = async () => {
  const url = `Admin/Dashboard/GetDashboardDetails`;

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
  AdminServices,
};
