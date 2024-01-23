import axios from "axios";

const getCANLIST = async (sectionalId, positionalId) => {
  let config = {
    method: "get",
    url: `Admin/Job/GetAppliedJobsUserList?sectionalId=${sectionalId}&positionalId=${positionalId}&sortType=S1`,
    headers: {
      "Content-Type": "application/json",
      //   Reg_userid: JSON.parse(localStorage.getItem("reg_id")),
    },
  };
  return axios.request(config).then((response) => {
    return response;
  });
};
const SortJob = async (sortType, appliedJobId) => {
  let config = {
    method: "post",
    url: `Admin/Job/SortJob?sortType=${sortType}&appliedJobId=${appliedJobId}`,
    headers: {
      "Content-Type": "application/json",
      //   Reg_userid: JSON.parse(localStorage.getItem("reg_id")),
    },
  };
  console.log(sortType);
  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  getCANLIST,
  SortJob,
};
