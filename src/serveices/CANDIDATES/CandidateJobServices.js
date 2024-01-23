import axios from "axios";

const GetAppliedJobsHistory = async () => {
    const url = `Candidate/Job/GetAppliedJobsHistory`;
  
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


  const AdminGetAllJobs = async () => {
    const url = `Candidate/Job/GetAllJobs`;
  
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
    GetAppliedJobsHistory,AdminGetAllJobs
  };
  