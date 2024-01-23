import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateJobDates } from "../../../action/CDPLC_ADMIN/Updatejobdate";
export default function Addstartenddate_Modal(props) {
  const { open, onClose, date: jobDetails } = props;
  const dispatch = useDispatch();
  // const [start_date, setStartDate] = useState(
  //   jobDetails === null ? null : dayjs(jobDetails.Job_Start_Date)
  // );
  // const [end_date, setEndDate] = useState(
  //   jobDetails === null ? null : dayjs(jobDetails.Job_End_Date)
  // );

  const [start_date, setStartDate] = useState(
    jobDetails ? dayjs(jobDetails.Job_Start_Date) : null
  );
  const [end_date, setEndDate] = useState(
    jobDetails ? dayjs(jobDetails.Job_End_Date) : null
  );

  const [start_dateError, setstart_dateError] = useState(false);
  const [end_dateError, setend_dateError] = useState(false);

  const validate = () => {
    const isValid = start_date !== null && end_date !== null;
    setstart_dateError(start_date === null);
    setend_dateError(end_date === null);
    return isValid;
  };

  useEffect(() => {
    if (jobDetails) {
      setStartDate(dayjs(jobDetails.Job_Start_Date));
      setEndDate(dayjs(jobDetails.Job_End_Date));
    } else {
      // Set default values or leave them as null based on your requirements
      setStartDate(null);
      setEndDate(null);
    }
  }, [jobDetails]);

  const handleSave = () => {
    if (validate()) {
      const formattedStartDate = start_date
        ? dayjs(start_date).format("YYYY-MM-DD")
        : null;
      const formattedEndDate = end_date
        ? dayjs(end_date).format("YYYY-MM-DD")
        : null;
      dispatch(
        updateJobDates(jobDetails.Job_id, formattedStartDate, formattedEndDate)
      );
      setStartDate(null);
      setEndDate(null);
      onClose();
      // window.location.reload();
    }
  };

  const errorColor = "red";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* <DialogTitle>Set Date</DialogTitle> */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          marginLeft: {
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: 0,
            xl: 0,
          },
          marginRight: {
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: 0,
            xl: 0,
          },
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container spacing={1} style={{ marginTop: "1px" }}>
          <Grid item xs={6} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {jobDetails && (
                <Box>
                  <TextField
                    label="ID"
                    value={jobDetails.Job_id}
                    variant="filled"
                    style={{ width: "200px", display: "none" }}
                    disabled
                  />
                </Box>

                // <TextField
                //   label="ID"
                //   value={jobDetails.Job_id}
                //   style={{ display: "none" }}
                // />
              )}
              <DialogTitle>Start Date</DialogTitle>
              <DatePicker
                label="Start Date"
                // value={start_date}
                value={
                  jobDetails === null
                    ? start_date
                    : dayjs(jobDetails.Job_Start_Date)
                }
                onChange={(newValue) => setStartDate(newValue)}
                error={start_dateError}
                // views={["year", "month", "day"]}
              />
              {start_dateError && (
                <Typography
                  variant="body2"
                  color="error"
                  component="span"
                  style={{ color: errorColor, fontSize: "0.75rem" }}
                >
                  This field is required
                </Typography>
              )}
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DialogTitle>End Date</DialogTitle>
              <DatePicker
                label="End Date"
                // value={end_date}
                value={
                  jobDetails === null
                    ? end_date
                    : dayjs(jobDetails.Job_End_Date)
                }
                onChange={(newValue) => setEndDate(newValue)}
                error={end_dateError}
                views={["year", "month", "day"]}
              />
              {end_dateError && (
                <Typography
                  variant="body2"
                  color="error"
                  component="span"
                  style={{ color: errorColor, fontSize: "0.75rem" }}
                >
                  This field is required
                </Typography>
              )}
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{
            marginLeft: {
              xs: "auto",
              sm: "auto",
              md: "auto",
              lg: "auto",
              xl: "auto",
            },
            marginRight: {
              xs: "auto",
              sm: "auto",
              md: "auto",
              lg: 0,
              xl: 0,
            },
            textAlign: "center",
            width: "fit-content",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
