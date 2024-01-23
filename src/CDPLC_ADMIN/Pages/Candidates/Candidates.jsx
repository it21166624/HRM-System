import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Checkbox,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CardContent,
} from "@mui/material";
import {
  // Other imports
  ArrowUpward,
  ArrowDownward,
  Sort as SortIcon, // Import SortIcon
} from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch, useSelector } from "react-redux";
import {
  getCANLIST,
  SortJob,
} from "../../../action/CDPLC_ADMIN/GetCandidatelist";
import CVModal from "../../Components/Modal/CVModal";
import Pdf_Reader from "../../Components/Document/Pdf_Reader";
import Swal from "sweetalert2";

import AppliedJobsModal from "../../Components/Modal/AppliedJobsModal";
import { GetsectionsList } from "../../../action/CDPLC_STAFF/StaffAddJob";
import {
  AdminGetsectionsList,
  GetAllJobs,
} from "../../../action/CDPLC_ADMIN/AdminAction";
import BioModal from "./../../Components/Modal/BioModal";
import CustomLoader from "../../Components/Modal/Loader";
import icc from "../../../ASSETS/icc.png";
export default function Candidates() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedId, setSelectedId] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [openbio, setopenbio] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [value, setvalue] = useState(null);
  const [details, setdetails] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [isAppliedJobsModalOpen, setIsAppliedJobsModalOpen] = useState(false);
  // const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [departmentValue, setDepartmentValue] = useState({
    value: "",
    error: "",
  });
  const [job_description, setjob_description] = useState({
    value: "",
    error: "",
  });

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.getCANLIST);
  const { data: sectionsList } = useSelector((state) => state.getsectionsList);
  const { data: allJobsData } = useSelector((state) => state.getAllJobs);
  useEffect(() => {
    // dispatch(getCANLIST());
    dispatch(AdminGetsectionsList());
    dispatch(GetAllJobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCANLIST(departmentValue.value, job_description.value));
  }, [departmentValue.value, job_description.value]);

  const handleFullScreenPreview = () => {
    const selectedNic = sortedRows.find(
      (row) => row.Reg_user_id === selectedRowID
    )?.Nic;
    if (selectedNic) {
      const pdfUrl = `https://hrm.dtselife.com/uploads/cvs/${selectedNic}.pdf`;
      const newTab = window.open(pdfUrl, "_blank");
      if (newTab) {
        newTab.document.documentElement.requestFullscreen();
      } else {
        Swal.fire("Error", "Could not open PDF preview.", "error");
      }
    }
  };

  const openAppliedJobsModal = (id) => {
    setSelectedId(id);
    setIsAppliedJobsModalOpen(true);
  };

  const closeAppliedJobsModal = () => {
    setIsAppliedJobsModalOpen(false);
  };

  const handleOpenBio = (row) => {
    console.log(row); // Check the console for the structure of the row object

    setvalue(row);
    setopenbio(true);
  };

  const handleOpenModal = (cv) => {
    setSelectedCV(cv);
    setdetails(cv);
    setOpen(true);
  };
  const handleCloseBio = (bio) => {
    setopenbio(false);
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

  // const handleSendListClick = () => {
  //   Swal.fire({
  //     title: "Confirm",
  //     text: "Are you sure you want to send the list?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //     cancelButtonText: "No",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Sent!", "The list has been sent.", "success");
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire("Cancelled", "The action has been cancelled.", "error");
  //     }
  //   });
  // };

  const handleDepartment = (event) => {
    const text = event.target.value;
    setDepartmentValue({ value: text, error: "" });
  };

  const handlePosition = (event) => {
    const text = event.target.value;
    setjob_description({ value: text, error: "" });
  };

  const handleSelectCandidate = (appliedJobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this candidate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(SortJob("HR", appliedJobId));
        Swal.fire({
          title: "Approved!",
          text: "The candidate has been approved.",
          icon: "success",
        }).then(() => {
          window.location.reload(false);
        });
      } else {
        Swal.fire("Cancelled", "The approval has been cancelled.", "error");
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
                List Of All Candidates
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

          <Card style={{ padding: "2px 5px", margin: "20px auto 0" }}>
        
            <Grid container spacing={2} justifyContent="space-between" mt="1%" >
              {/* Dropdown Section */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small" sx={{ height: '50%' }}>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Department"
                    label="Department"
                    autoComplete="Department"
                    sx={{ height: 55 }}
                    value={departmentValue.value}
                    onChange={handleDepartment}
                  >
                    {sectionsList &&
                      sectionsList.map((item) => (
                        <MenuItem key={item.sectionId} value={item.sectionId}>
                          {item.sectionName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Textbox Section */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small"  sx={{ height: '50%' }}>
                  <InputLabel id="demo-simple-select-label">
                    Position
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Position"
                    label="Position"
                    autoComplete="Position"
                    sx={{ height: 55 }}
                    value={job_description.value}
                    onChange={handlePosition}
                  >
                    {allJobsData &&
                      allJobsData.map((item) => (
                        <MenuItem key={item.Job_id} value={item.Job_id}>
                          {item.Job_position}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl fullWidth size="small">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      color: "black",
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
                </FormControl>
              </Grid>
            </Grid>

     
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "2%",
                marginTop: "1%",
              }}
            >
              <TableContainer
                sx={{
                  width: "100%",
                  height: "auto",
                }}
                component={Paper}
              >
                {/* <Grid item xs={12} sm={2} sx={{ backgroundColor: "blue" }}></Grid> */}

                {/* <Button
            variant="contained"
            sx={{
              // marginRight: "55%",
              marginLeft: "86%",
              marginBottom: "1%",
              backgroundColor: "gold",
              color: "black",
            }}
            onClick={handleSendListClick}
          >
            Send List
          </Button> */}
                <Table sx={{}} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#4194c4" }}>
                    <TableRow>
                      {/* <TableCell
                  align="center"
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  ID
                </TableCell> */}

                      <TableCell align="left">Name</TableCell>
                      {/* <TableCell align="center">Position</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  Department
                </TableCell> */}
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
                      {/* <TableCell
                  align="center"
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  Action
                </TableCell> */}
                      <TableCell
                        align="center"
                        // sx={{
                        //   display: { xs: "table-cell", sm: "none" },
                        // }}
                      >
                        View CV
                      </TableCell>
                      <TableCell align="center">View Applied Jobs</TableCell>
                      <TableCell align="center">Select Candidate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRows.map((row) => (
                      <TableRow
                        key={row.Reg_user_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        onClick={() => handleRowClick(row.Reg_user_id)}
                        selected={selectedRowID === row.Reg_user_id}
                        hover
                      >
                        {/* <TableCell align="center">{row.Reg_user_id}</TableCell> */}
                        <TableCell align="left">{row.Full_name}</TableCell>
                        {/* <TableCell align="center">Position</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    Department
                  </TableCell> */}
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
                        {/* <TableCell
                    align="center"
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    <Button onClick={() => handleOpenBio(row)}>
                      More Details
                    </Button>
                  </TableCell> */}
                        <TableCell
                          align="center"
                          // sx={{
                          //   display: { xs: "table-cell", sm: "none" },
                          // }}
                        >
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
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "lightsalmon",
                              color: "black",
                            }}
                            onClick={() =>
                              openAppliedJobsModal(row.Applied_job_id)
                            }
                          >
                            Applied Jobs
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {/* <Checkbox
                      checked={selectedCheckboxes[row.Reg_user_id] || false}
                      onChange={() => handleCheckboxChange(row.Reg_user_id)}
                    /> */}
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "lightgreen",
                              color: "black",
                            }}
                            onClick={() =>
                              handleSelectCandidate(row.Applied_job_id)
                            }
                          >
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <AppliedJobsModal
                  open={isAppliedJobsModalOpen}
                  onClose={closeAppliedJobsModal}
                  selectedId={selectedId}
                  // other props as needed
                />
                <BioModal
                  open={openbio}
                  onClose={handleCloseBio}
                  value={value}
                />
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

              <Card
                sx={{
                  width: "50%",
                  height: "auto",
                  // backgroundColor: "#4194c4",
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "6%",
                    marginTop: "5%",
                    marginLeft: "5%",
                    marginBottom: "2%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography gutterBottom variant="h5">
                    CV Preview
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      width: "20px", // Set the desired width
                      height: "30px",
                    }}
                    onClick={handleFullScreenPreview}
                  >
                    <FullscreenIcon />
                  </Button>
                </div>
                {selectedRowID && (
                  <Pdf_Reader
                    file_name={
                      sortedRows.find(
                        (row) => row.Reg_user_id === selectedRowID
                      )?.Nic
                    }
                  />
                )}
              </Card>
            </Box>
          </Card>
        </>
      )}
    </Box>
  );
}
