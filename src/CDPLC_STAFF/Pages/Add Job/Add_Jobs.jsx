import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ic from "../../../ASSETS/ic.png";
import {
  GetsectionsList,
  addJob,
} from "../../../action/CDPLC_STAFF/StaffAddJob";
import { validateCnt } from "../../helpers/available";
import { validateDepartment } from "../../helpers/department";
import { validateDescription } from "../../helpers/discription";
import { validateJobPosition } from "../../helpers/jobposition";
import { validateRequirements } from "../../helpers/requirment";

export default function Add_Jobs() {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
  const { data } = useSelector((state) => state.getsectionsList);
  const dispatch = useDispatch();
  const [job_position, setjob_position] = useState({ value: "", error: "" });
  const [job_position_count, setjob_position_Count] = useState({
    value: "",
    error: "",
  });
  const [departmentValue, setDepartmentValue] = useState({
    value: "",
    error: "",
  });
  const [job_description, setjob_description] = useState({
    value: "",
    error: "",
  });
  const [job_requirment, setjob_requirment] = useState({
    value: "",
    error: "",
  });
  const [salary_range, setsalary_range] = useState({ value: "", error: "" });

  useEffect(() => {
    dispatch(GetsectionsList());
  }, [dispatch]);
  const resetForm = () => {
    setjob_position({ value: "", error: "" });
    setjob_position_Count({ value: "", error: "" });
    setDepartmentValue({ value: "", error: "" });
    setjob_description({ value: "", error: "" });
    setjob_requirment({ value: "", error: "" });
    setsalary_range({ value: "", error: "" });
  };
  const handleJobPosition = (event) => {
    const text = event.target.value;
    setjob_position({ value: text, error: "" });
  };
  const handleJobPositionConut = (event) => {
    const text = event.target.value;
    setjob_position_Count({ value: text, error: "" });
  };
  const handleDepartment = (event) => {
    const text = event.target.value;
    setDepartmentValue({ value: text, error: "" });
  };
  const handleDescription = (event) => {
    const text = event.target.value;
    setjob_description({ value: text, error: "" });
  };
  const handleRequirements = (event) => {
    const text = event.target.value;
    setjob_requirment({ value: text, error: "" });
  };
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmitPressed();
  // };
  const openSuccessAlert = () => {
    setSuccessAlertOpen(true);
  };

  const closeSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };

  const Sectional_id = JSON.parse(localStorage.getItem("Sectional_id"));
  const onSubmitPressed = () => {
    const requestBodyData = new FormData();
    requestBodyData.append("Sectional_id", departmentValue.value);
    requestBodyData.append("Job_position", job_position.value);
    requestBodyData.append("Job_description", job_description.value);
    requestBodyData.append("Job_requirment", job_requirment.value);
    requestBodyData.append("Cnt", job_position_count.value);

    const job_positionError = validateJobPosition(job_position.value);
    const departmentError = validateDepartment(departmentValue.value);
    const job_descriptionError = validateDescription(job_description.value);
    const job_requirmentError = validateRequirements(job_requirment.value);
    const job_cntsError = validateCnt(job_position_count.value);

    setjob_position({ ...job_position, error: job_positionError });
    setDepartmentValue({ ...departmentValue, error: departmentError });
    setjob_description({ ...job_description, error: job_descriptionError });
    setjob_requirment({ ...job_requirment, error: job_requirmentError });
    setjob_position_Count({ ...job_position_count, error: job_cntsError });
    if (
      job_positionError.value ||
      departmentError.value ||
      job_descriptionError.value ||
      job_requirmentError ||
      job_cntsError
    ) {
      return;
    } else if (
      job_positionError ||
      departmentError ||
      job_descriptionError ||
      job_requirmentError ||
      job_cntsError
    ) {
      return;
    } else {
      dispatch(addJob(requestBodyData));
      resetForm();
      Swal.fire("Thank you!", "Your submission has been sent.", "success");
    }
  };
  const handleClearJob = () => {
    resetForm();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Clear!",
      // text: "",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  return (
    <div className="">
      <Grid >
        <Card
          sx={{
            margin: "0 auto",
            backgroundColor: "#E1F5FE",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Add Jobs
            </Typography>
          </CardContent>
          <img
            src={ic}
            alt="icon"
            style={{
              width: "8%",
              height: "auto",
            }}
          />
        </Card>
        <Card
          style={{  padding: "2px 5px", margin: "20px auto 0" }}
        >
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {/* Fill up the form and our team will get back to you within 24
              hours. */}
            </Typography>
            {/* <form onSubmit={handleSubmit}> */}
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} item>
                <TextField
                  id="job_position"
                  fullWidth
                  size="small"
                  placeholder="Enter Job Position"
                  label="Job Position"
                  variant="outlined"
                  required
                  value={job_position.value}
                  onChange={handleJobPosition}
                  error={!!job_position.error}
                  helperText={
                    !!job_position.error ? "Please enter Job Position" : ""
                  }
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl
                  fullWidth
                  size="small"
                  error={!!departmentValue.error}
                >
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="departmentValue"
                    label="Department"
                    value={departmentValue.value}
                    onChange={handleDepartment}
                    autoComplete="dep"
                    required
                  >
                    {data &&
                      data.map((item) => (
                        <MenuItem value={item.sectionId}>
                          {item.sectionName}
                        </MenuItem>
                      ))}
                  </Select>
                  {!!departmentValue.error && (
                    <FormHelperText>
                      {!!departmentValue.error
                        ? "Please Select Department"
                        : ""}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="job_description"
                  size="small"
                  label="Job Description"
                  multiline
                  rows={4}
                  placeholder="Type your Description"
                  variant="outlined"
                  fullWidth
                  required
                  value={job_description.value}
                  onChange={handleDescription}
                  error={!!job_description.error}
                  helperText={
                    job_description.error ? "Please enter description" : ""
                  }
                />
              </Grid>
              <Grid Grid xs={12} item>
                <TextField
                  id="job_requirment"
                  size="small"
                  label="job requirment "
                  multiline
                  rows={4}
                  placeholder="Type your Description"
                  variant="outlined"
                  fullWidth
                  required
                  value={job_requirment.value}
                  onChange={handleRequirements}
                  error={!!job_requirment.error}
                  helperText={
                    !!job_requirment.error ? "Please enter requirment" : ""
                  }
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  id="position_count"
                  fullWidth
                  size="small"
                  placeholder="Enter Job Position Count"
                  label="Job Position Count"
                  variant="outlined"
                  required
                  value={job_position_count.value}
                  onChange={handleJobPositionConut}
                  error={!!job_position_count.error}
                  helperText={
                    !!job_position_count.error ? "Please enter Number" : ""
                  }
                  type="number"
                />
              </Grid>
              {/* <Grid item xs={12}>
                  <Range />
                </Grid> */}
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-end"
                spacing={3}
              >
                <Grid item xs={12} sm={3}>
                  <Button
                    type="reset"
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleClearJob}
                  >
                    Clear Job
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      Swal.fire({
                        title: "Do you want to send the request?",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Send",
                        denyButtonText: `Don't send`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */

                        if (result.isConfirmed) {
                          onSubmitPressed();
                          // Swal.fire(
                          //   "Thank you!",
                          //   "Your submission has been sent.",
                          //   "success"
                          // );
                        } else if (result.isDenied) {
                          Swal.fire(
                            "Cancel!",
                            "Your submission has not sent.",
                            "warning"
                          );
                        }
                      });
                    }}
                  >
                    Request Job
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* </form> */}
          </CardContent>
        </Card>
      </Grid>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Add Job</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure about that?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={onSubmitPressed} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar
        open={isSuccessAlertOpen}
        autoHideDuration={5000} // Adjust the duration as needed
        onClose={closeSuccessAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={closeSuccessAlert}
          severity="success"
        >
          Job added successfully!
        </MuiAlert>
      </Snackbar> */}
    </div>
  );
}
