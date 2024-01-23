import axios from "axios";
//get all job details
const getPanellist = async () => {
  const url = `Staff/Interview/GetInterviewPanelDetails`;

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

const UpdateInterviewPanel = async (
  PanelId,
  PanelName,
  Interviewer1,
  Interviewer2,
  Interviewer3,
  Interviewer4
) => {
  // let data = JSON.stringify({
  //   PanelName: PanelName,
  //   Interviewer1: Interviewer1,
  //   Interviewer2: Interviewer2,
  //   Interviewer3: Interviewer3,
  //   Interviewer4: Interviewer4,
  //   PanelId: PanelId,
  // });

  let data = new FormData();
  data.append("PanelId", PanelId);
  data.append("PanelName", PanelName);
  data.append("Interviewer1", Interviewer1);
  data.append("Interviewer2", Interviewer2);
  data.append("Interviewer3", Interviewer3);
  data.append("Interviewer4", Interviewer4);

  let config = {
    method: "post",
    url: `Staff/Interview/UpdateInterviewPanel`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
    // data: JSON.parse(data), // Parse the string back to an object
  };

  return axios.request(config).then((response) => {
    console.log(response);
    return response;
  });
};

const DeleteInterviewPanel = async (id) => {
  const config = {
    method: "delete",
    url: `Staff/Interview/DeleteInterviewPanel?id=${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.request(config).then((response) => {
    console.log(response);
    return response;
  });
};

// const addUser = async (requestData) => {
//   const Headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//   };

//   try {
//     const response = await axios.post("Admin/User/AddStaffUser", requestData, {
//       headers: Headers,
//     });
//     // console.log(requestData);
//     return response.data;
//   } catch (error) {
//     console.error("Error occurred during ADD JOB:", error);
//     throw new Error("Failed to JOB ADD. Please try again later.");
//   }
// };

export default {
  //   addUser,
  getPanellist,
  UpdateInterviewPanel,
  DeleteInterviewPanel,
  //   deleteUser,
  //   updateUser,
};
