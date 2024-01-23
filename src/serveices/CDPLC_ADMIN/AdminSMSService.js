import axios from "axios";

const SMS_API_BASE_URL = "https://esystems.cdl.lk/apidock/api/SMS";

const AdminSMSService = (mobileNo) => {
  const SMS_API_URL = `${SMS_API_BASE_URL}/SendOTP?mobileNo=${mobileNo}`;

  return axios.post(SMS_API_URL);
};

export { AdminSMSService };
