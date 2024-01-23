import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { CreateInterviewPanel } from "../../../action/CDPLC_STAFF/InterviewPanelActoion";
import ic from "../../../ASSETS/ic.png";
import {
  getPanellist,
  UpdateInterviewPanel,
  DeleteInterviewPanel,
} from "../../../action/CDPLC_STAFF/PanelAction";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";

export default function Panel_Create() {
  const dispatch = useDispatch();
  // const { loading: ProLoading } = useSelector((state) => state.CreateInterviewPanel);
  const createPanelState = useSelector((state) => state.CreateInterviewPanel);
  const [panelName, setPanelName] = useState({ value: "", error: "" });
  const [interviewer1, setInterviewer1] = useState({ value: "", error: "" });
  const [interviewer2, setInterviewer2] = useState({ value: "", error: "" });
  const [interviewer3, setInterviewer3] = useState({ value: "", error: "" });
  const [interviewer4, setInterviewer4] = useState({ value: "", error: "" });

  const [editUserId, setEditUserId] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const { data, loading } = useSelector((state) => state.getPanellist);
  useEffect(() => {
    dispatch(getPanellist());
  }, [dispatch]);

  const handleSaveDetails = () => {
    console.log(isUpdateMode);
    if (
      !panelName.value ||
      !interviewer1.value ||
      !interviewer2.value ||
      !interviewer3.value ||
      !interviewer4.value
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    const panelData = {
      PanelId: editUserId,
      PanelName: panelName.value,
      Interviewer1: interviewer1.value,
      Interviewer2: interviewer2.value,
      Interviewer3: interviewer3.value,
      Interviewer4: interviewer4.value,
    };

    // console.log("ssssssss", editUserId);
    if (isUpdateMode) {
      dispatch(UpdateInterviewPanel(panelData)); // Make sure UpdateInterviewPanel accepts an object as its payload
      //  Swal.fire("Success", "Panel has been updated successfully.", "success");
      window.location.reload();
    } else {
      const requestBodyData = new FormData();
      requestBodyData.append("panelName", panelName.value);
      requestBodyData.append("interviewer1", interviewer1.value);
      requestBodyData.append("interviewer2", interviewer2.value);
      requestBodyData.append("interviewer3", interviewer3.value);
      requestBodyData.append("interviewer4", interviewer4.value);

      dispatch(CreateInterviewPanel(requestBodyData));
      // Swal.fire("Success", "New panel has been added successfully.", "success");
      window.location.reload();
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = data.find((user) => user.PanelId === userId);
    if (userToEdit) {
      setIsUpdateMode(true);
      setEditUserId(userId);
      setPanelName({ value: userToEdit.PanelName, error: "" });
      setInterviewer1({ value: userToEdit.Interviewer1, error: "" });
      setInterviewer2({ value: userToEdit.Interviewer2, error: "" });
      setInterviewer3({ value: userToEdit.Interviewer3, error: "" });
      setInterviewer4({ value: userToEdit.Interviewer4, error: "" });
    }
    console.log(userToEdit);
  };

  const handleClearDetails = () => {
    // Clear the form fields
    setPanelName("");
    setInterviewer1("");
    setInterviewer2("");
    setInterviewer3("");
    setInterviewer4("");
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Do you want to delete this panel?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteInterviewPanel(userId));
        Swal.fire("Deleted!", "Panel has been deleted.", "success").then(() => {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire("Cancel!", "Panel deletion has been canceled.", "warning");
      }
    });
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
            <CardContent>
              <Typography gutterBottom variant="h5">
                Create Panel
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

          <Card style={{ padding: "2px 5px", margin: "20px auto 0" }}>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid xs={12} sm={12} item>
                <TextField
                  id="panelName"
                  fullWidth
                  size="small"
                  placeholder="Enter Panel Name"
                  label="Panel Name"
                  variant="outlined"
                  required
                  value={panelName.value}
                  onChange={(e) =>
                    setPanelName({ ...panelName, value: e.target.value })
                  }
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth size="small">
                  <InputLabel id="interviewer1-label">Interviewer 1</InputLabel>
                  <Select
                    labelId="interviewer1-label"
                    id="interviewer1"
                    label="Interviewer 1"
                    value={interviewer1.value}
                    onChange={(e) =>
                      setInterviewer1({
                        ...interviewer1,
                        value: e.target.value,
                      })
                    }
                    required
                  >
                    <MenuItem value="1">Test 1</MenuItem>
                    <MenuItem value="2">Test 2</MenuItem>
                    <MenuItem value="3">Test 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth size="small">
                  <InputLabel id="interviewer2-label">Interviewer 2</InputLabel>
                  <Select
                    labelId="interviewer2-label"
                    id="interviewer2"
                    label="Interviewer 2"
                    value={interviewer2.value}
                    onChange={(e) =>
                      setInterviewer2({
                        ...interviewer2,
                        value: e.target.value,
                      })
                    }
                    required
                  >
                    <MenuItem value="4">Test 4</MenuItem>
                    <MenuItem value="5">Test 5</MenuItem>
                    <MenuItem value="6">Test 6</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth size="small">
                  <InputLabel id="interviewer3-label">Interviewer 3</InputLabel>
                  <Select
                    labelId="interviewer3-label"
                    id="interviewer3"
                    label="Interviewer 3"
                    value={interviewer3.value}
                    onChange={(e) =>
                      setInterviewer3({
                        ...interviewer3,
                        value: e.target.value,
                      })
                    }
                    required
                  >
                    <MenuItem value="7">Test 7</MenuItem>
                    <MenuItem value="8">Test 8</MenuItem>
                    <MenuItem value="9">Test 9</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth size="small">
                  <InputLabel id="interviewer4-label">Interviewer 4</InputLabel>
                  <Select
                    labelId="interviewer4-label"
                    id="interviewer4"
                    label="Interviewer 4"
                    value={interviewer4.value}
                    onChange={(e) =>
                      setInterviewer4({
                        ...interviewer4,
                        value: e.target.value,
                      })
                    }
                    required
                  >
                    <MenuItem value="10">Test 10</MenuItem>
                    <MenuItem value="11">Test 11</MenuItem>
                    <MenuItem value="12">Test 12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  type="button"
                  variant="contained"
                  color="primary"
                  // disabled={createPanelState.loading}
                  onClick={() => {
                    Swal.fire({
                      title: isUpdateMode
                        ? "Do you want to update this panel?"
                        : "Do you want to add a new panel?",
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      denyButtonText: `No`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleSaveDetails();
                      } else if (result.isDenied) {
                        Swal.fire(
                          "Cancel!",
                          "Your submission has not been sent.",
                          "warning"
                        );
                      }
                    });
                  }}
                >
                  {/* {createPanelState.loading
                    ? "Updating..."
                    : isUpdateMode
                    ? "Update Panel"
                    : "Create Panel"} */}
                  {isUpdateMode ? "Update Panel" : "Create Panel"}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleClearDetails}
                >
                  Clear Details
                </Button>
              </Grid>
            </Grid>
          </Card>

          <TableContainer
            sx={{
              marginTop: "2%",
              // maxwidth: "2%",
              maxHeight: 600,
            }}
            component={Paper}
          >
            <Table aria-label="sticky table">
              {" "}
              <TableHead sx={{ backgroundColor: "#4194c4" }}>
                <TableRow>
                  <TableCell align="left">PanelName</TableCell>
                  <TableCell align="left">Interviewer1</TableCell>
                  <TableCell align="left">Interviewer2</TableCell>
                  <TableCell align="left">Interviewer3</TableCell>
                  <TableCell align="left">Interviewer4</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row) => (
                    <TableRow key={data.PanelId}>
                      <TableCell align="left">{row.PanelName}</TableCell>
                      <TableCell align="left">{row.Interviewer1}</TableCell>
                      <TableCell align="left">{row.Interviewer2}</TableCell>
                      <TableCell align="left">{row.Interviewer3}</TableCell>
                      <TableCell align="left">{row.Interviewer4}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="Edit"
                          onClick={() => handleEditUser(row.PanelId)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="Delete"
                          onClick={() => handleDeleteUser(row.PanelId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
