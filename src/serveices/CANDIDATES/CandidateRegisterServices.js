import axios from "axios";

const getRegister = async (requestBody) => {
  const Headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post("Login/RegisterUser", requestBody, {
      headers: Headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw new Error("Failed to register. Please try again later.");
  }
};

export default {
  getRegister,
};
