// JobModal.jsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import mainLogo from "../../../ASSETS/mainlogo.png";
import logo from "../../../ASSETS/logo.png";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const JobModal = ({ open, handleClose, selectedJob }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="80"
      sx={{ height: "100vh" }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Grid sx={{ m: 0, p: 2, alignSelf: "start" }}>
        <img
          src={mainLogo}
          alt="Main Logo"
          style={{
            position: "revert",
            top: "5%",
            right: "5%",
          }}
        />
      </Grid>
      <Grid sx={{ mt: "-5%" }}>
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          <Typography
            variant="subtitle1"
            style={{ fontSize: 30, fontWeight: "bold", color: "grey" }}
          >
            {" "}
            {selectedJob != null ? selectedJob.Job_position : ""}
          </Typography>{" "}
          <Typography
            variant="subtitle1"
            style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}
          >
            Colombo Dockyard PLC
          </Typography>
          <Typography>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-end" },
                }}
              >
                <label
                  style={{
                    marginLeft: "2px",
                    marginRight: "10px",
                    backgroundColor: "#01BE7E",
                    color: "white",
                    padding: "3px",
                    borderRadius: "3px",
                    marginRight: "5px",
                    maxWidth: "auto",
                  }}
                >
                  FULL-TIME
                </label>{" "}
                <LocationOnIcon
                  style={{
                    fontSize: "13px",
                    marginLeft: "20px",
                    marginRight: "2px",
                    fontSize: "24px", // Adjust the font size as needed
                    fontWeight: "bold",
                    marginBottom: "-7px",
                  }}
                />
                Colombo
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <EventIcon
                  variant="body1"
                  style={{
                    marginRight: "2px",
                    fontSize: "24px", // Adjust the font size as needed
                    fontWeight: "bold",
                    color: "#00A9E0",
                    marginLeft: "20px",
                    marginBottom: "-7px",
                  }}
                />
                <span style={{ color: "#00A9E0" }}>
                  Closing Date -{" "}
                  {selectedJob != null
                    ? dayjs(selectedJob.Job_End_Date).format("YYYY-MM-DD")
                    : ""}
                </span>
              </Grid>
            </Grid>
          </Typography>
        </DialogTitle>
      </Grid>

      <DialogContent dividers>
        <div style={{ padding: "2%" }}>
          <Typography
            gutterBottom
            style={{
              color: "#7C9EB2",
            }}
          >
            If you're looking for a career that will help you stand out, join
            CDPLC and fulfil your potential. Whether you want a career that
            could take you to the top, or simply take you in an exciting new
            direction, CDPLC offers opportunities, support and rewards that will
            take you further. Please refer to the job advert for further
            information.
          </Typography>
        </div>

        <Divider variant="short" />

        <div style={{ padding: "2%" }}>
          <Typography
            variant="h6"
            style={{ color: "black", fontWeight: "bold", marginBottom: "1%" }}
          >
            Job Description :
          </Typography>

          <Typography>
            {selectedJob != null ? selectedJob.Job_description : ""}
          </Typography>
        </div>

        <div style={{ padding: "2%" }}>
          <Typography
            variant="h6"
            style={{ color: "black", fontWeight: "bold", marginBottom: "1%" }}
          >
            Job Requirement :
          </Typography>
          <Typography>
            <ul>
              {selectedJob != null &&
                selectedJob.Job_requirment &&
                selectedJob.Job_requirment.split("\n").map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
            </ul>
          </Typography>
        </div>
      </DialogContent>

      <Typography
        gutterBottom
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "center", mt: "2%" }}
      >
        PLEASE CLICK THE APPLY BUTTON TO SEND YOUR CV
      </Typography>

      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          onClick={() => {
            handleClose();
            navigate("/form", { state: { jobData: selectedJob } });
          }}
          autoFocus
          variant="contained"
          color="success"
        >
          Apply here
        </Button>
        <Button
          onClick={handleClose}
          autoFocus
          variant="contained"
          color="error"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobModal;

/* <img
          src={mainLogo}
          alt="Main Logo"
          style={{
            position: "absolute",
            top: "50px",
            right: "70px",
          }}
        /> */
