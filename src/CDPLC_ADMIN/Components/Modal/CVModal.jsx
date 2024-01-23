import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Grid,
  Button,
  Card,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Pdf_Reader from "../Document/Pdf_Reader";
import BioModal from "./BioModal";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import StaffBioModal from "../../../CDPLC_STAFF/Components/Modal/StaffBioModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Set a percentage width for the modal
  maxWidth: "1000px", // Add a maximum width for larger screens
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

const CVModal = ({ open, onClose, selectedCV, details }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [openbio, setOpenbio] = useState(false);
  const [openstaffbio, setOpenstaffbio] = useState(false);
  const [selectedBIO, setSelectedBIO] = useState(null);

  const handleFullPreview = () => {
    window.open(
      `https://hrm.dtselife.com/uploads/cvs/${details}.pdf`,
      "_blank",
      "fullscreen=yes"
    );
  };
  const handleModalClose = () => {
    console.log(selectedCV);
    onClose();
  };
  const handleOpenModal = (bio) => {
    setSelectedBIO(bio);
    setOpenbio(true);
  };

  const handleCloseModal = () => {
    setOpenbio(false);
  };
  // const handleSelectCandidate = () => {
  //   setConfirmationOpen(true);
  // };

  const handleConfirmationClose = (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      // Perform the "Select Candidate" action
      // ...
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Candidate Profile
        </Typography>

        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            marginTop: "5%",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          {details && (
            <Box>
              <Grid container direction="column">
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" alignSelf={"start"}>
                    CV Preview
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleFullPreview}
                    sx={{
                      color: "black",
                      width: "20px", // Set the desired width
                      height: "30px",
                    }}
                  >
                    <FullscreenIcon />
                  </Button>
                </Grid>

                <Card
                  sx={{
                    width: isSmallScreen ? "100%" : "300px",
                    height: "350px",
                    alignSelf: "center",
                    marginTop: "2%",
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  <Pdf_Reader file_name={details} />
                </Card>
                {/* Close button */}
                <div
                  style={{
                    alignSelf: "center",
                    marginTop: "20px",
                  }}
                >
                  {/* <Button
                    variant="contained"
                    onClick={handleDownloadCV}
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkblue",
                      },
                    }}
                  >
                    Download CV
                  </Button> */}
                </div>
              </Grid>
            </Box>
          )}
          {selectedCV && (
            <Box>
              <Grid container direction="column">
                <Typography
                  gutterBottom
                  variant="h5"
                  marginTop={"5%"}
                  alignSelf={"center"}
                >
                  Candidate Details
                </Typography>
                <div
                  style={{
                    alignSelf: "center",
                    marginTop: "5%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    //  flexDirection: "column",
                  }}
                >
                  <TextField
                    label="ID"
                    // value={selectedCV.Reg_userid}
                    value={selectedCV.Reg_user_id}
                    variant="filled"
                    style={{ width: "200px" }}
                    disabled
                  />
                  {/* <TextField
                  label="Date"
                  value={selectedCV.Date}
                  variant="filled"
                  style={{ width: "200px" }}
                  disabled
                /> */}
                  <TextField
                    label="Name"
                    value={selectedCV.Full_name}
                    // value={selectedCV.UserName}
                    variant="filled"
                    style={{ width: "200px" }}
                    disabled
                  />
                  {/* <TextField
                  label="Position"
                  value={selectedCV.Position}
                  variant="filled"
                  style={{ width: "200px" }}
                  disabled
                />
                <TextField
                  label="Department"
                  value={selectedCV.Department}
                  variant="filled"
                  style={{ width: "200px" }}
                  disabled
                /> */}
                  <TextField
                    label="Email"
                    value={selectedCV.Email}
                    variant="filled"
                    style={{ width: "200px" }}
                    disabled
                  />
                  <TextField
                    label="Tel_No"
                    value={selectedCV.Mobile_no}
                    // value={selectedCV.MobileNo}
                    variant="filled"
                    style={{ width: "200px" }}
                    disabled
                  />
                </div>
              </Grid>
            </Box>
          )}
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          <Button variant="contained" onClick={() => handleOpenModal()}>
            More Details
          </Button>
          {/* <Button variant="contained" onClick={handleSelectCandidate}>
            Select Candidate
          </Button> */}
          <Button
            variant="contained"
            onClick={handleModalClose}
            sx={{
              backgroundColor: "darkred",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Close
          </Button>
        </div>
        {/* Confirmation dialog */}
        <Dialog
          open={confirmationOpen}
          onClose={() => handleConfirmationClose(false)}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to select this candidate?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmationClose(false)}>No</Button>
            <Button onClick={() => handleConfirmationClose(true)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {JSON.parse(localStorage.getItem("userType")) === "S" ? (
          <StaffBioModal
            open={openbio}
            onClose={handleCloseModal}
            selectedBIO={selectedBIO}
            value={selectedCV?.Reg_user_id}
       
          />
        ) : (
          <BioModal
            open={openbio}
            onClose={handleCloseModal}
            selectedBIO={selectedBIO}
            value={selectedCV?.Reg_user_id}
          />
        )}
      </Box>
    </Modal>
  );
};

export default CVModal;
