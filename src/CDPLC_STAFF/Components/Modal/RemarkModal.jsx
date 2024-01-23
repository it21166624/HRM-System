import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { UpdateInterviewFinalStatus } from "../../../action/CDPLC_STAFF/InterviewPanelActoion";

export default function RemarkModal(props) {
  const { open, onClose, selectedRowData, interviewOverallStatus } = props;
  const [remark, setRemark] = useState(null);
  const dispatch = useDispatch();

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure you want to send the remarks?",
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
        // data.append(
        //   "InterviewStatus",
        //   interviewOverallStatus[selectedRowData.Email]?.overallStatus
        // );
        if (
          interviewOverallStatus[selectedRowData.Email]?.overallStatus ===
            null ||
          interviewOverallStatus[selectedRowData.Email]?.overallStatus ===
            undefined
        ) {
          data.append("InterviewStatus", selectedRowData.InterviewStatus);
        } else {
          data.append(
            "InterviewStatus",
            interviewOverallStatus[selectedRowData.Email]?.overallStatus
          );
        }
        data.append("InterviewRemark", remark);
        data.append("ApplicantAppliedJobId", selectedRowData.ApplicantAppJobid);

        dispatch(UpdateInterviewFinalStatus(data));

        Swal.fire({
          title: "Remarks sent successfully!",
          icon: "success",
          customClass: {
            container: "sweet-alert-container",
          },
        });
        setRemark("");
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
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Remarks </DialogTitle>
      <DialogContent>
        <Box>
          <Typography gutterBottom variant="h6">
            {selectedRowData && selectedRowData.Email}
          </Typography>
          <TextField
            multiline
            rows={10}
            placeholder="Enter remarks..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            style={{ width: "100%", resize: "vertical", borderRadius: "5px" }}
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
