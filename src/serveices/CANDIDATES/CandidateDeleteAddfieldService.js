import axios from "axios";

const DeleteHigherEducationDetails = async (requestBody1) => {
  const Headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      `Candidate/User/DeleteHigherEducationDetails`,
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

const DeleteEmployeeDetails = async (requestBody2) => {
  const Headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `Candidate/User/DeleteEmployeeDetails`,
      requestBody2,
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

const DeleteProfessionalDetails = async (requestBody3) => {
  const Headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      `Candidate/User/DeleteProfessionalDetails`,
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

export default {
  DeleteHigherEducationDetails,
  DeleteEmployeeDetails,
  DeleteProfessionalDetails,
};
