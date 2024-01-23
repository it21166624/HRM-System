import axios from "axios";

const AddUpdateUserdetails = async (requestBody) => {
  const Headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    const response = await axios.post(
      `Candidate/User/AddUpdateUserdetails`,
      requestBody,
      {
        headers: Headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error("Failed to register. Please try again later.");
  }
};

const getData = async (requestBody, bio_id, fileFormData, nic, reg_id) => {
  const fileExtension = fileFormData.name.split(".").pop();
  const newFileName = `${nic}.${fileExtension}`;
  const Headers1 = {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    Reg_userid: reg_id,
  };
  const Headers2 = {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    Reg_userid: reg_id,
  };

  try {
    if (bio_id) {
      const response = await axios.post(`User/UpdateBioDetails`, requestBody, {
        headers: Headers1,
      });
      return response.data;
    } else {
      const formData = new FormData();
      formData.append("CvFile", fileFormData, newFileName);
      formData.append("Nic", nic);

      console.log("File:", fileFormData);
      console.log("Nic:", nic);
      console.log("reg_id:", reg_id);

      const response = await axios.post(`User/AddBioDetails`, requestBody, {
        headers: Headers2,
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error("Failed to register. Please try again later.");
  }
};

const getData1 = async (requestBody1) => {
  const Headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `User/AddHigherEducationDetails`,
      requestBody1,
      {
        headers: Headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error("Failed to register. Please try again later.");
  }
};

const getData2 = async (requestBody2) => {
  const Headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`User/AddEmployeeDetails`, requestBody2, {
      headers: Headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error("Failed to register. Please try again later.");
  }
};

const getData3 = async (requestBody3) => {
  const Headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `User/AddProfessionalDetails`,
      requestBody3,
      {
        headers: Headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error("Failed to register. Please try again later.");
  }
};

const ApplyJob = async (jobId, userId) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `Candidate/Job/ApplyJob?JobId=${jobId}`,
    headers: {
      reg_userid: userId,
    },
  };

  axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default {
  getData,
  getData1,
  getData2,
  getData3,
  ApplyJob,
  AddUpdateUserdetails,
};
