import axios from "axios";

//get all job details
const getHistory = async () => {
  const url = `Staff/Job/GetJobDetails?JobId=`;

  const config = {
    method: "get",
    url,
    headers: {
      "Content-Type": "application/json",
      // Reg_userid: JSON.parse(localStorage.getItem("reg_id")),
    },
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

//update job detail status
const updateJobStatusDetails = async (Job_id) => {
  let data = JSON.stringify({
    Is_active: "D",
  });

  let config = {
    method: "post",
    url: `Staff/Job/UpdateJobStatusDetails?Job_id=${Job_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios.request(config).then((response) => {
    console.log(response);
    return response;
  });
};

export default {
  getHistory,
  updateJobStatusDetails,
};
