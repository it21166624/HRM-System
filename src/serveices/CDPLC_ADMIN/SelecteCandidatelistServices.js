import axios from "axios";

const GetAppliedJobsUserList = async (sectionalId, positionalId, sortType) => {
  let config = {
    method: "get",
    url: `Admin/Job/GetAppliedJobsUserList?sectionalId=${sectionalId}&positionalId=${positionalId}&sortType=${sortType}`,
    headers: {
      "Content-Type": "application/json",
      //   Reg_userid: JSON.parse(localStorage.getItem("reg_id")),
    },
  };
  return axios.request(config).then((response) => {
    return response;
  });
};

const GetPassUserList = async (sectionalId, positionalId) => {
  let config = {
    method: "get",
    url: `Admin/Job/GetAppliedJobsUserList?sectionalId=${sectionalId}&positionalId=${positionalId}&sortType=S4`,

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
  GetAppliedJobsUserList,
  GetPassUserList,
};
