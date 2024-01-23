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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetPassUserList } from "../../../action/CDPLC_ADMIN/SelCandidatelist";
import CVModal from "../../Components/Modal/CVModal";
import { GetAppliedJobsUserList } from "../../../action/CDPLC_ADMIN/SelCandidatelist";
import InterviewPassedListModal from "../../Components/Modal/InterviewPassedListModal";
import CustomLoader from "../../Components/Modal/Loader";
import icc from "../../../ASSETS/icc.png";

export default function Passed_List() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [remark, setRemark] = useState(null);

  const [passedListModalOpen, setPassedListModalOpen] = useState(false);
  const [selectedPassedlistDetails, setSelectedpassedListDetails] =
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
    setSelectedpassedListDetails(interviewDetails);
    setPassedListModalOpen(true);
  };

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.GetPassUserList);
  const { data: sectionsList } = useSelector((state) => state.getsectionsList);
  const { data: allJobsData } = useSelector((state) => state.getAllJobs);
  useEffect(() => {
    dispatch(GetPassUserList(departmentValue.value, job_description.value));
  }, [departmentValue.value, job_description.value]);

  //   const handleOpenModal = (cv) => {
  //     setSelectedCV(cv);
  //     setOpen(true);
  //   };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRowClick = (Reg_user_id) => {
    setSelectedRowID(Reg_user_id);
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
                Interview Passed List
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
            <Grid container spacing={2} justifyContent="space-between" mt="1%">
              {/* Dropdown Section */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small" sx={{ height: "50%" }}>
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
                <FormControl fullWidth size="small" sx={{ height: "50%" }}>
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
              <Grid item xs={12} sm={2}>
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
                  overflowX: "auto",
                }}
                component={Paper}
              >
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
                      {/* <TableCell align="center">Action</TableCell> */}
                      <TableCell align="center">
                        {/* <Checkbox checked={selectAll} onChange={handleSelectAll} /> */}
                      </TableCell>
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
                        {/* <TableCell align="center">
                    <Button onClick={() => handleOpenModal(row)}>
                      View CV
                    </Button>
                  </TableCell> */}
                        {/* <TableCell>
                    <Checkbox
                      checked={selectedCheckboxes[row.Reg_user_id] || false}
                      onChange={() => handleCheckboxChange(row.Reg_user_id)}
                    />
                  </TableCell> */}
                        {/* <TableCell align="center">
                        <TextField
                          multiline
                          rows={1}
                          placeholder="Remarks..."
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          disabled="true"
                          style={{
                            width: "100%",
                            resize: "vertical",
                            borderRadius: "5px",
                          }}
                        />
                      </TableCell> */}
                        <TableCell
                          align="center"
                          sx={{
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          {row.Interview_remark}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "lightyellow",
                              color: "black",
                            }}
                            onClick={() => handleOpenInterviewModal(row)}
                          >
                            Send Appointment Details
                          </Button>
                        </TableCell>
                        {/* <TableCell align="center"> */}
                        {/* <textarea
                value={remarks}
                onChange={(e) => handleRemarkChange(row.Reg_user_id, e.target.value)}
                placeholder="Enter Remark"
                rows={3}
                cols={30}
              /> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* <CVModal
            open={open}
            onClose={handleCloseModal}
            selectedCV={selectedCV}
            details={
              sortedRows.find((row) => row.Reg_user_id === selectedRowID)?.Nic
            }
          /> */}
              </TableContainer>
              {/* {selectedRowID && (
            <Pdf_Reader
              file_name={
                sortedRows.find((row) => row.Reg_user_id === selectedRowID)?.Nic
              }
            />
          )} */}
            </Box>
            <InterviewPassedListModal
              open={passedListModalOpen}
              onClose={() => setPassedListModalOpen(false)}
              interviewDetails={selectedPassedlistDetails}
            />
          </Card>
        </>
      )}
    </Box>
  );
}
