import axios from "axios";

const CreateInterviewPanel = async (requestData) => {
  try {
    const response = await axios.post(
      "Staff/Interview/CreateInterviewPanel",
      requestData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error occurred during ADD JOB:", error);
  }
};

const UpdateInterviewStatus = async (requestData) => {
  try {
    const response = await axios.post(
      "Staff/Interview/UpdateInterviewStatus",
      requestData
    );
    return response;
  } catch (error) {
    console.error("Error occurred during ADD JOB:", error);
  }
};

const UpdateInterviewFinalStatus = async (requestData) => {
  try {
    const response = await axios.post(
      "Staff/Interview/UpdateInterviewFinalStatus",
      requestData
    );
    return response;
  } catch (error) {
    console.error("Error occurred during ADD JOB:", error);
  }
};

const GetInterviewList = async () => {
  const url = `Staff/Interview/GetInterviewList`;

  const config = {
    method: "get",
    url,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const getAppointCandidates = async (sectionalId) => {
  let config = {
    method: "get",
    url: `Staff/Appointment/GetAppointnmentList`,
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
  GetInterviewList,
  UpdateInterviewStatus,
  CreateInterviewPanel,
  UpdateInterviewFinalStatus,
  getAppointCandidates,
};
