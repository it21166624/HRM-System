import axios from "axios";

const AdminGetJobDetails = async (jobId) => {
  const url = `Admin/Job/GetJobDetails?JobId=${jobId}`;

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

const AdminGetsectionsList = async () => {
  const url = `Admin/Section/GetsectionsList`;

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

const AcceptJobs = async (Job_id) => {
  let config = {
    method: "post",
    url: `Admin/Job/AcceptJobs?JobId=${Job_id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.request(config).then((response) => {
    // console.log(response);
    return response;
  });
};

const GetAllJobs = async () => {
  const url = `Admin/Job/GetAllJobs`;

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

const GetAppliedJobsDetails = async (jobId) => {
  let config = {
    method: "get",
    url: `Admin/Job/GetAppliedJobsDetails?AppliedJobId=${jobId}`,
    headers: {
      "Content-Type": "application/json",
      //   Reg_userid: JSON.parse(localStorage.getItem("reg_id")),
    },
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  AcceptJobs,
  GetAllJobs,
  GetAppliedJobsDetails,
  AdminGetsectionsList,
  AdminGetJobDetails,
};
