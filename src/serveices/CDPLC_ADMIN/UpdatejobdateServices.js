import axios from "axios";

const updateJobDates = async (Job_id, Job_Start_Date, Job_End_Date) => {
  const url = "Admin/Job/UpdateJobDates";

  let data = JSON.stringify({
    Job_id: Job_id,
    Job_Start_Date: Job_Start_Date,
    Job_End_Date: Job_End_Date,
  });

  let config = {
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  updateJobDates,
};
