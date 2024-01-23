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
  CardContent,
} from "@mui/material";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  StaffGetAppliedJobsUserList,
  StaffSortJob,
} from "../../../action/CDPLC_STAFF/StaffApprovedList";
import Swal from "sweetalert2";
import CVModal from "../../../CDPLC_ADMIN/Components/Modal/CVModal";
import Pdf_Reader from "../../../CDPLC_ADMIN/Components/Document/Pdf_Reader";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import AppliedJobsModal from "../../../CDPLC_ADMIN/Components/Modal/AppliedJobsModal";
import { GetsectionsList } from "../../../action/CDPLC_STAFF/StaffAddJob";
import { GetAllJobs } from "../../../action/CDPLC_ADMIN/AdminAction";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";
import ic from "../../../ASSETS/ic.png";
export default function Approved_Admin() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedId, setSelectedId] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [details, setdetails] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [isAppliedJobsModalOpen, setIsAppliedJobsModalOpen] = useState(false);

  const [departmentValue, setDepartmentValue] = useState({
    value: "",
    error: "",
  });
  const [job_description, setjob_description] = useState({
    value: "",
    error: "",
  });

  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.StaffGetAppliedJobsUserList
  );
  const { data: sectionsList } = useSelector((state) => state.getsectionsList);
  const { data: allJobsData } = useSelector((state) => state.getAllJobs);
  useEffect(() => {
    // dispatch(StaffGetAppliedJobsUserList());
    dispatch(GetsectionsList());
    dispatch(GetAllJobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      StaffGetAppliedJobsUserList(
        departmentValue.value,
        job_description.value,
        "S2"
      )
    );
  }, [departmentValue.value, job_description.value]);

  const handleFullScreenPreview = () => {
    const selectedNic = sortedRows.find(
      (row) => row.Reg_user_id === selectedRowID
    )?.Nic;

    if (selectedNic) {
      const pdfUrl = `https://hrm.dtselife.com/uploads/cvs/${selectedNic}.pdf`;

      // Open the PDF in a new tab
      const newTab = window.open(pdfUrl, "_blank");

      // Fullscreen the new tab
      if (newTab) {
        newTab.document.documentElement.requestFullscreen();
      } else {
        // Handle if the new tab couldn't be opened
        Swal.fire("Error", "Could not open PDF preview.", "error");
      }
    }
  };
  // dispatch(StaffSortJob(appliedJobId));
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
        dispatch(StaffSortJob(appliedJobId));
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

  // const openAppliedJobsModal = (id) => {
  //   setSelectedId(id);
  //   setIsAppliedJobsModalOpen(true);
  // };

  const closeAppliedJobsModal = () => {
    setIsAppliedJobsModalOpen(false);
  };

  const handleOpenModal = (cv) => {
    setSelectedCV(cv);
    setdetails(cv);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRowClick = (Reg_user_id) => {
    setSelectedRowID(Reg_user_id);
  };

  // const handleSort = (column) => {
  //   if (column === sortedColumn) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortedColumn(column);
  //     setSortOrder("asc");
  //   }
  // };
  // const handleCheckboxChange = (id) => {
  //   setSelectedCheckboxes((prevState) => ({
  //     ...prevState,
  //     [id]: !prevState[id],
  //   }));
  // };
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

  const handlePosition = (event) => {
    const text = event.target.value;
    setjob_description({ value: text, error: "" });
  };
  return (
    <Box>
      {loading ? (
        <Box>
          <CustomLoader />
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
             
                Approved Candidates By Admin
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "2%",
                marginTop: "2%",
              }}
            >
              <TableContainer
                sx={{
                  width: "100%",
                  height: "auto",
                }}
                component={Paper}
              >
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
                      {/* <TableCell align="center">ID</TableCell> */}

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
                      <TableCell align="center">View CV</TableCell>
                      {/* <TableCell align="center">Action</TableCell> */}
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
                        {/* <TableCell align="center">
                    <Button
                      // onClick={openAppliedJobsModal}
                      onClick={() => openAppliedJobsModal(row.Reg_user_id)}
                    >
                      Applied Jobs
                    </Button>
                  </TableCell> */}
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
                  backgroundColor: "white",

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
