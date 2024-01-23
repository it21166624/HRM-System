import axios from "axios";

const editProfile = async (requestBody) => {
  const Headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "Candidate/User/UpdateUserDetails",
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

const uploadUserImage = async (imageFormData, nic, reg_id) => {
  try {
    const fileExtension = imageFormData.name.split(".").pop();
    const newFileName = `${nic}.${fileExtension}`;

    const formData = new FormData();
    formData.append("ImageFile", imageFormData, newFileName);
    formData.append("Nic", nic);

    console.log("ImageFile:", imageFormData);
    console.log("Nic:", nic);
    console.log("reg_id:", reg_id);
    const response = await axios.post("Candidate/User/AddUserImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        //   Reg_userid: reg_id,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error occurred during image upload:", error);
    throw new Error("Failed to upload image. Please try again later.");
  }
};

export default {
  editProfile,
  uploadUserImage,
};
