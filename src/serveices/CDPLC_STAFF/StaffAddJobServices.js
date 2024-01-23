import axios from "axios";

const StaffGetEmployeeSummary = async (Reguserid) => {
  let config = {
    method: "get",
    url: `Staff/User/GetEmployeeSummary?Reguserid=${Reguserid}`,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetsectionsList = async () => {
  const url = `Staff/Section/GetsectionsList`;

  const config = {
    method: "get",
    url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.request(config).then((response) => {
    return response.data;
  });
};

const addJob = async (requestData) => {
  const Headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post("Staff/Job/PostJobDetails", requestData, {
      headers: Headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred during ADD JOB:", error);
    throw new Error("Failed to JOB ADD. Please try again later.");
  }
};

export default {
  addJob,
  GetsectionsList,
  StaffGetEmployeeSummary,
};
