import React, { useState } from "react";
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

export default function RequestForm() {
  const [jobPosition, setJobPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [positions, setPositions] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState({
    jobPosition: false,
    department: false,
    positions: false,
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    let formValid = true;
    const newErrors = {
      jobPosition: false,
      department: false,
      positions: false,
    };

    if (jobPosition === "") {
      newErrors.jobPosition = true;
      formValid = false;
    }

    if (department === "") {
      newErrors.department = true;
      formValid = false;
    }

    if (positions === "") {
      newErrors.positions = true;
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      setOpenDialog(true);
    }
  };

  const handleClear = () => {
    setJobPosition("");
    setDepartment("");
    setPositions("");
    setErrors({
      jobPosition: false,
      department: false,
      positions: false,
    });
  };

  return (
    <div className="bgcolor">
      <Grid sx={{ marginTop: "10%" }}>
        <Card
          style={{ maxWidth: "80%", padding: "20px 5px", margin: "0 auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              REQUEST FORM
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form and our team will get back to you within 24
              hours.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} item>
                  <FormControl
                    fullWidth
                    size="small"
                    error={errors.jobPosition}
                  >
                    <InputLabel id="job-position-label">
                      Job Position
                    </InputLabel>
                    <Select
                      labelId="job-position-label"
                      id="job-position"
                      autoComplete="off"
                      label="Job Position"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    {errors.jobPosition && (
                      <FormHelperText>
                        Please select a job position
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth size="small" error={errors.department}>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      autoComplete="off"
                      label="Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    {errors.department && (
                      <FormHelperText>
                        Please select a department
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    placeholder="Enter No.of Positions"
                    label="Available Positions"
                    variant="outlined"
                    value={positions}
                    onChange={(e) => setPositions(e.target.value)}
                    error={errors.positions}
                  />
                  {errors.positions && (
                    <FormHelperText>
                      Please enter the number of positions
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item sm={3} sx={{ marginLeft: "50%" }}>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleClear}
                  >
                    Clear Request
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Request Job
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure about that?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
