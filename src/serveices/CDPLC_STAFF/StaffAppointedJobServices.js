import axios from "axios";

const StaffUpdateAppointmentStatus = async (appointment_id) => {
  let config = {
    method: "post",
    url: `Staff/Appointment/UpdateAppointmentStatus?appointmentId=${appointment_id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  StaffUpdateAppointmentStatus,
};
