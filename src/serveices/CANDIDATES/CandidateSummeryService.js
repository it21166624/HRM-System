import axios from "axios";

const getSummery = async (Reguserid) => {
  let url;

  if (Reguserid) {
    url = `Admin/User/GetEmployeeSummary?Reguserid=${Reguserid}`;
  } else {
    url = "Candidate/User/GetEmployeeSummary";
  }
  // console.log(Reguserid);
  let config = {
    method: "get",
    url: url,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};



export default {
  getSummery,
};
