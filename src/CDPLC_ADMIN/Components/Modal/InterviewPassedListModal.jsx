import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { CreateAppointment } from "../../../action/CDPLC_ADMIN/InterviewPanelActoion";
// import { AdminSMSAction } from "../../../action/CDPLC_ADMIN/AdminSMSAction";

export default function InterviewPassedListModal(props) {
  const dispatch = useDispatch();
  const { open, onClose, interviewDetails } = props;
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [appointmentLocation, setAppointmentLocation] = useState("");
  const [remark, setRemark] = useState("");

  const handleSave = () => {
    if (!appointmentDateTime || !appointmentLocation) {
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
        sweetAlertContainer.style.zIndex = 9999;
      }
    } else {
      Swal.fire({
        title: "Are you sure you want to send the appointment details?",
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
          data.append(
            "AppointmentDate",
            dayjs(appointmentDateTime).format("YYYY-MM-DD HH:mm:ss").toString()
          );
          data.append("Location", appointmentLocation);
          data.append("Remarks", remark);

          data.append("ApplicantAppliedJobId", interviewDetails.Applied_job_id);
          data.append("RegUserId", interviewDetails.Reg_user_id);

          dispatch(CreateAppointment(data));
          // dispatch(AdminSMSAction(interviewDetails.Mobile_no));
          setAppointmentDateTime(null);
          setAppointmentLocation("");
          setRemark("");

          Swal.fire({
            title: "appointment details sent successfully!",
            icon: "success",
            customClass: {
              container: "sweet-alert-container",
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
      <DialogTitle>Appointment Details</DialogTitle>
      <DialogContent>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Appointment Date"
                value={appointmentDateTime}
                onChange={(newValue) => setAppointmentDateTime(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="Appointment Location"
            fullWidth
            value={appointmentLocation}
            onChange={(e) => setAppointmentLocation(e.target.value)}
            margin="normal"
          />
          <TextField
            multiline
            rows={2}
            placeholder="Enter remarks..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            style={{
              width: "100%",
              resize: "vertical",
              borderRadius: "5px",
            }}
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
