import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { CreateInterview } from "../../../action/CDPLC_ADMIN/InterviewPanelActoion";
// import { AdminSMSAction } from "../../../action/CDPLC_ADMIN/AdminSMSAction";

export default function InterviewDetailsModal(props) {
  const dispatch = useDispatch();
  const { Data } = useSelector((state) => state.GetInterviewPanelDetails);
  const { open, onClose, interviewDetails } = props;
  const [interviewDateTime, setInterviewDateTime] = useState(null);
  const [interviewLocation, setInterviewLocation] = useState("");
  const [documentsToBring, setDocumentsToBring] = useState("");
  const [selectedPanel, setSelectedPanel] = useState("");

  const handleSave = () => {
    if (
      !interviewDateTime ||
      !interviewLocation ||
      !documentsToBring ||
      !selectedPanel
    ) {
      Swal.fire({
        title: "Please fill all the fields",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        customClass: {
          container: "sweet-alert-container", // Add a custom class to the SweetAlert container
        },
      });
      const sweetAlertContainer = document.querySelector(
        ".sweet-alert-container"
      );
      if (sweetAlertContainer) {
        sweetAlertContainer.style.zIndex = 9999; // Set a higher z-index value
      }
    } else {
      Swal.fire({
        title: "Are you sure you want to send the interview details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonColor: "#d33",
        customClass: {
          container: "sweet-alert-container",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = new FormData();
          data.append("InterviewPanelId", selectedPanel);
          data.append(
            "DateTime",
            dayjs(interviewDateTime).format("YYYY-MM-DD HH:mm:ss").toString()
          );
          data.append("Location", interviewLocation);
          data.append("RequiredDocuments", documentsToBring);
          data.append("ApplicantAppliedJobId", interviewDetails.Applied_job_id);
          console.log(interviewDetails);
          dispatch(CreateInterview(data));
          // dispatch(AdminSMSAction(interviewDetails.Mobile_no));
          setInterviewDateTime(null);
          setInterviewLocation("");
          setDocumentsToBring("");
          setSelectedPanel("");

          Swal.fire({
            title: "Interview details sent successfully!",
            icon: "success",
            customClass: {
              container: "sweet-alert-container", // Add the same custom class to the success Swal
            },
          });
        }
        const sweetAlertContainer = document.querySelector(
          ".sweet-alert-container"
        );
        if (sweetAlertContainer) {
          sweetAlertContainer.style.zIndex = 9999;
        }
      });
      const sweetAlertContainer = document.querySelector(
        ".sweet-alert-container"
      );
      if (sweetAlertContainer) {
        sweetAlertContainer.style.zIndex = 9999;
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Interview Details</DialogTitle>
      <DialogContent>
        <Box>
          <Select
            value={selectedPanel}
            onChange={(e) => setSelectedPanel(e.target.value)}
            displayEmpty
            sx={{ width: "100%", marginBottom: 2 }} // Adjust width and margin as needed
          >
            <MenuItem value="" disabled>
              Select Panel
            </MenuItem>
            {Data &&
              Data.map((item) => (
                <MenuItem value={item.PanelId}>{item.PanelName}</MenuItem>
              ))}
            {/* Add more MenuItem components for additional panels */}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Interview Date"
                value={interviewDateTime}
                onChange={(newValue) => setInterviewDateTime(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="Interview Location"
            fullWidth
            value={interviewLocation}
            onChange={(e) => setInterviewLocation(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Documents to Bring"
            fullWidth
            value={documentsToBring}
            onChange={(e) => setDocumentsToBring(e.target.value)}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="warning">
          Cancel{" "}
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
