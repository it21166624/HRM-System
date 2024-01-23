import axios from "axios";

const GetInterviewPanelDetails = async () => {
  const url = `Admin/Interview/GetInterviewPanelDetails`;

  const config = {
    method: "get",
    url,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const CreateInterview = async (requestData) => {
  try {
    const response = await axios.post(
      "Admin/Interview/CreateInterview",
      requestData
    );
    return response;
  } catch (error) {
    console.error("Error occurred during ADD JOB:", error);
  }
};

const CreateAppointment = async (requestData) => {
  try {
    const response = await axios.post(
      "Admin/Appointment/CreateAppointment",
      requestData
    );
    return response;
  } catch (error) {
    console.error("Error occurred during ADD Appointment:", error);
  }
};

export default {
  GetInterviewPanelDetails,
  CreateInterview,
  CreateAppointment,
};
