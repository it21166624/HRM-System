import axios from "axios";
//get all job details
const getStafflist = async () => {
  const url = `Admin/User/GetStaffList`;

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

const addUser = async (requestData) => {
  const Headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post("Admin/User/AddStaffUser", requestData, {
      headers: Headers,
    });
    // console.log(requestData);
    return response.data;
  } catch (error) {
    console.error("Error occurred during ADD JOB:", error);
    throw new Error("Failed to JOB ADD. Please try again later.");
  }
};

const deleteUser = async (id) => {
  const config = {
    method: "delete",
    url: `Admin/User/DeleteStaffUser?Id=${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.request(config).then((response) => {
    console.log(response);
    return response;
  });
};

const updateUser = async (Reg_user_id, Section_Id, Email, Password) => {
  let data = JSON.stringify({
    Section_Id: Section_Id,
    Email: Email,
    Password: Password,
    Reg_user_id: Reg_user_id,
  });

  let config = {
    method: "post",
    url: `Admin/User/UpdateStaffUser`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    // data: JSON.parse(data), // Parse the string back to an object
  };

  return axios.request(config).then((response) => {
    console.log(response);
    return response;
  });
};
export default {
  addUser,
  getStafflist,
  deleteUser,
  updateUser,
};
