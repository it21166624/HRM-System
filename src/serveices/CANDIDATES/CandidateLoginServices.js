import axios from "axios";

const login = async (email, password) => {
  return axios
    .get(`Login/UserLogin?email=${email}&password=${password}`)
    .then((response) => {
      return response;
    });
};

const GetUserType = async () => {
  return axios.get(`Login/GetUserType`).then((response) => {
    return response;
  });
};

export default {
  login,
  GetUserType,
};
