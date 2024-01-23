import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid, Card, TextField, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import User from "../../../ASSETS/User.png";
import Button from "@mui/material/Button";
import SummaryModal from "./Summary_Modal";
import { editProfile } from "../../../action/CANDIDATES/CandidateProfileEdit";
import { getProfile } from "../../../action/CANDIDATES/CandidateProfile";
import { uploadImage } from "../../../action/CANDIDATES/CandidateProfileEdit";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import emp from "../../../ASSETS/emp.png";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";

const defaultTheme = createTheme();

export default function Profile() {
  const dispatch = useDispatch();
  // const [uploadedImageData, setUploadedImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const { data, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  // const [reg_id, type] = user.split("/");
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [fullName, setFullName] = useState(data.Full_name || "");
  const [address, setAddress] = useState(data.Address || "");
  const [email, setEmail] = useState(data.Email || "");
  const [mobile_no, setMobile_no] = useState(data.Mobile_no || "");
  const [nic, setNic] = useState(data.Nic || "");
  // const [isImageUploaded, setIsImageUploaded] = useState(!!data.Img_Path);
  const [sanitizedMobile, setSanitizedMobile] = useState(data.Mobile_no || "");

  useEffect(() => {
    setFullName(data.Full_name || "");
    setAddress(data.Address || "");
    setEmail(data.Email || "");
    setSanitizedMobile(data.Mobile_no || "");
    setNic(data.Nic || "");
    // if (data && data.Img_Path) {
    //   setImagePath(data.Img_Path);
    // }
    if (data && data.Nic) {
      setImagePath(`https://hrm.dtselife.com/uploads/photos/${data.Nic}.jpg`);
    }
    console.log("PATH", data.Img_Path);
  }, [
    data.Full_name,
    data.Address,
    data.Email,
    data.Mobile_no,
    data.Nic,
    data.Img_Path,
    data,
  ]);

  console.log(data);
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Convert canvas to Blob in JPG format
          canvas.toBlob(
            (blob) => {
              const newFile = new File([blob], `${file.name}.jpg`, {
                type: "image/jpeg",
              });

              // Now you can upload the newFile or perform any action with it
              dispatch(uploadImage(newFile, nic, ""));
            },
            "image/jpeg",
            1 // JPEG image quality (from 0 to 1)
          );
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert("Accept only '.jpg', '.jpeg', '.png' type images.");
    }
  };

  const { profileEditdataDispatch } = useSelector((state) => state.editprofile);

  // useEffect(() => {
  //   // dispatch(getProfile(""));
  // }, [profileEditdataDispatch]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      onEditPressed();
    }
  };

  const onEditPressed = () => {
    // const emailRegex = /\S+@\S+\.\S+/;
    // if (!email.match(emailRegex)) {
    //   toast.error("Email must be a valid email address", {
    //     position: "top-right",
    //   });
    //   return;
    // }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.match(emailRegex)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email must be a valid email address",
      });
      return;
    }

    // const telephoneRegex = /^\d{9}$/;
    // if (!mobile_no.match(telephoneRegex)) {
    //   toast.error("Telephone number must be a valid 9-digit mobile number", {
    //     position: "top-right",
    //   });
    //   return;
    // }
    const telephoneRegex = /^\d{9}$/;
    if (!sanitizedMobile.match(telephoneRegex)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Telephone number must be a valid 9-digit mobile number",
      });
      return;
    }

    // const nicRegex = /^(?:\d{10}V|\d{12})$/;
    // if (!nic.match(nicRegex)) {
    //   toast.error(
    //     "NIC number must be a valid 10-digit number with 'V' or 12-digit number",
    //     {
    //       position: "top-right",
    //     }
    //   );
    //   return;
    // }
    const nicRegex = /^(?:\d{10}V|\d{12})$/;
    if (!nic.match(nicRegex)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'NIC number must be a valid 10-digit number with "V" or 12-digit number',
      });
      return;
    }

    const requestBodyData = {
      Reg_user_id: "",
      Full_name: fullName,
      Address: address,
      Email: email,
      Mobile_no: sanitizedMobile,
      Nic: nic,
    };

    if (!fullName || !address || !email || !sanitizedMobile || !nic) {
      // toast.error("Please fill all the fields and update", {
      //   position: "top-right",
      // });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all the fields and update",
      });
      return;
    } else {
      dispatch(editProfile(requestBodyData))
        .then(() => {
          //   toast.success("Successfully Updated", { position: "top-right" });
          // })
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully Updated",
          }).then(() => window.location.reload());
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          // Handle error, if any
        });
    }
  };

  return (
    <Box>
      {loading ? (
        <Box>
          <CustomLoader />
          {/* text="Loading..." */}
        </Box>
      ) : (
        <>
          <Card
            sx={{
              margin: "0 auto",
              backgroundColor: "#E1F5FE",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ ml: "1%" }}>
              My Profile
            </Typography>
            <img
              src={emp}
              alt="icon"
              style={{
                width: "6%",
                height: "auto",
                marginRight: "1%",
              }}
            />
          </Card>
          <Card style={{ borderRadius: "12px", margin: "20px auto 0" }}>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    minHeight: "62vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "#1976d2",
                    borderRadius: "12px",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "white",
                      marginBottom: 4,
                      marginTop: 8,
                    }}
                  >
                    <img
                      // src={uploadedImageData || User}
                      src={imagePath || User}
                      alt="User"
                      onError={(e) => {
                        console.error("Error loading image:", e);
                      }}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                  {/* {!isImageUploaded && (
              <>
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
              </>
            )} */}
                  <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "white", marginTop: 5 }}
                  >
                    <center>
                      {data ? data.Full_name : "Loading..."}
                      <br />
                      {data ? data.Address : "Loading..."}
                    </center>
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Card
                  sx={{
                    minHeight: "55vh",
                    bgcolor: "white",
                    borderRadius: "12px",
                    p: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Full Name</Typography>
                      <TextField
                        value={fullName}
                        autoComplete="fullName"
                        name="fullName"
                        required
                        fullWidth
                        id="fullName"
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={!isEditing}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          marginBottom: 1,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Address</Typography>
                      <TextField
                        value={address}
                        autoComplete="address"
                        name="address"
                        required
                        fullWidth
                        id="address"
                        disabled={!isEditing}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          width: "100%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Email</Typography>
                      <TextField
                        value={email}
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          width: "100%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>Telephone</Typography>
                      <TextField
                        // value={mobile_no}
                        value={sanitizedMobile}
                        autoComplete="sanitizedMobile"
                        name="sanitizedMobile"
                        required
                        fullWidth
                        id="sanitizedMobile"
                        // onChange={(e) => setMobile_no(e.target.value)}
                        onChange={(e) => {
                          // Remove leading '0' and update the sanitized mobile state
                          const inputMobile = e.target.value
                            .replace(/^0+/, "")
                            .slice(0, 9);
                          setSanitizedMobile(inputMobile);
                        }}
                        disabled={!isEditing}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          width: "100%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>NIC</Typography>
                      <TextField
                        value={nic}
                        autoComplete="nic"
                        name="nic"
                        required
                        fullWidth
                        id="nic"
                        type="nic"
                        onChange={(e) => setNic(e.target.value)}
                        disabled={!isEditing}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          width: "100%",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ marginRight: "70px" }}
                      onClick={handleEditClick}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      My application
                    </Button>
                  </Box>
                </Card>
              </Grid>
              {/* </Box> */}
            </Grid>
            <SummaryModal
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          </Card>
        </>
      )}
    </Box>
  );
}
