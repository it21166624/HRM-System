import axios from "axios";


const StaffSortJob = async (appliedJobId) => {
  let config = {
    method: "post",
    url: `Staff/Job/SortJob?sortType=SECTION&appliedJobId=${appliedJobId}`,
    headers: {
      "Content-Type": "application/json",
      //   Reg_userid: JSON.parse(localStorage.getItem("reg_id")),
    },
  };
  return axios.request(config).then((response) => {
    return response;
  });
};



const StaffGetAppliedJobsUserList = async (sectionalId, positionalId,sortType) => {
  let config = {
    method: "get",
    url: `Staff/Job/GetAppliedJobsUserList?sectionalId=${sectionalId}&positionalId=${positionalId}&sortType=${sortType}`,
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
  StaffGetAppliedJobsUserList,StaffSortJob
};
