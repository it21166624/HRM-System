import React, { useState, useMemo, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
  Card,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAppliedJobsUserList } from "../../../action/CDPLC_ADMIN/SelCandidatelist";
import CVModal from "../../Components/Modal/CVModal";
import Swal from "sweetalert2";
import CustomLoader from "../../Components/Modal/Loader";
import icc from "../../../ASSETS/icc.png";

export default function Selected_Candidates() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [selectedInterviewDetails, setSelectedInterviewDetails] =
    useState(null);

  const [departmentValue, setDepartmentValue] = useState({
    value: "",
    error: "",
  });
  const [job_description, setjob_description] = useState({
    value: "",
    error: "",
  });

  const handleOpenInterviewModal = (interviewDetails) => {
    setSelectedInterviewDetails(interviewDetails);
    setInterviewModalOpen(true);
  };

  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.GetAppliedJobsUserList
  );
  const { data: sectionsList } = useSelector((state) => state.getsectionsList);
  const { data: allJobsData } = useSelector((state) => state.getAllJobs);
  useEffect(() => {
    dispatch(
      GetAppliedJobsUserList(departmentValue.value, job_description.value,"S2")
    );
  }, [departmentValue.value, job_description.value]);

  const handleOpenModal = (cv) => {
    setSelectedCV(cv);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRowClick = (Reg_user_id) => {
    setSelectedRowID(Reg_user_id);
  };

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };
  const handleCheckboxChange = (id) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedCheckboxes = {};

    if (selectAll) {
      // Unselect all checkboxes
      Object.keys(selectedCheckboxes).forEach((key) => {
        updatedCheckboxes[key] = false;
      });
    } else {
      // Select all checkboxes
      sortedRows.forEach((row) => {
        updatedCheckboxes[row.Reg_user_id] = true;
      });
    }

    setSelectedCheckboxes(updatedCheckboxes);
  };

  const sortedRows = useMemo(() => {
    if (sortedColumn) {
      return data.slice().sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
        } else {
          return b[sortedColumn] > a[sortedColumn] ? 1 : -1;
        }
      });
    } else {
      return data;
    }
  }, [data, sortedColumn, sortOrder]);

  const handleSendListClick = () => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to send the list?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Sent!", "The list has been sent.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do nothing if the user clicks "No"
        Swal.fire("Cancelled", "The action has been cancelled.", "error");
      }
    });
  };

  const handleDepartment = (event) => {
    const text = event.target.value;
    setDepartmentValue({ value: text, error: "" });
  };

  // const handlePosition = (event) => {
  //   const text = event.target.value;
  //   setjob_description({ value: text, error: "" });
  // };

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
            Selected Candidates Details
          </Typography>
            </CardContent>
            <img
              src={icc}
              alt="icon"
              style={{
                width: "8%",
                height: "auto",
              }}
            />
          </Card>
   


            <TableContainer
              sx={{
                width: "100%",
                height: "auto",
                padding: "2px 5px", margin: "20px auto 0",
              }}
              component={Paper}
            >
              
              <Grid
                style={{
                  marginTop: "1%",
                  paddingBottom: "1%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                // justifyContent="flex-end"
              >
                <Grid container spacing={2}>
                  {/* Dropdown Section */}
                  <Grid item xs={8} sm={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="Department"
                        label="Department"
                        autoComplete="Department"
                        value={departmentValue.value}
                        onChange={handleDepartment}
                      >
                        {sectionsList &&
                          sectionsList.map((item) => (
                            <MenuItem
                              key={item.sectionId}
                              value={item.sectionId}
                            >
                              {item.sectionName}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={3}
                  sx={{
                    // backgroundColor: "blue",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      color: "black",
                      marginRight: "10px", // Add margin to create a gap
                    }}
                    onClick={() => {
                      setjob_description({
                        value: "",
                        error: "",
                      });
                      setDepartmentValue({
                        value: "",
                        error: "",
                      });
                    }}
                  >
                    Reset
                  </Button>
                  {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "gold",
                  color: "black",
                  width: "150px", // Adjust the width to your preference
                }}
                onClick={handleSendListClick}
              >
                Send List
              </Button> */}
                </Grid>

                {/* <Grid
              item
              xs={6}
              sm={2}
              sx={{
                // backgroundColor: "blue",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Grid> */}
              </Grid>

              <Table sx={{}} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#4194c4" }}>
                  <TableRow>
                    {/* <TableCell align="center">ID</TableCell> */}

                    <TableCell align="left">Name</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      Mobile
                    </TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow
                      key={row.Reg_user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => handleRowClick(row.Reg_user_id)}
                      selected={selectedRowID === row.Reg_user_id}
                      hover
                    >
                      {/* <TableCell align="center">{row.Reg_user_id}</TableCell> */}
                      <TableCell align="left">{row.Full_name}</TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: { xs: "none", sm: "table-cell" },
                        }}
                      >
                        {row.Email}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: { xs: "none", sm: "table-cell" },
                        }}
                      >
                        {row.Mobile_no}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "lightblue",
                            color: "black",
                          }}
                          onClick={() => handleOpenModal(row)}
                        >
                          View CV
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CVModal
                open={open}
                onClose={handleCloseModal}
                selectedCV={selectedCV}
                details={
                  sortedRows.find((row) => row.Reg_user_id === selectedRowID)
                    ?.Nic
                }
              />
            </TableContainer>
            {/* {selectedRowID && (
            <Pdf_Reader
              file_name={
                sortedRows.find((row) => row.Reg_user_id === selectedRowID)?.Nic
              }
            />
          )} */}
         
        </>
      )}
    </Box>
  );
}
