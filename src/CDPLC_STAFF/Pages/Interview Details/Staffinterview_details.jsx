import {
  Box,
  Button,
  Grid,
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
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CVModal from "../../../CDPLC_ADMIN/Components/Modal/CVModal";
import {
  GetInterviewList,
  UpdateInterviewStatus,
} from "../../../action/CDPLC_STAFF/InterviewPanelActoion";
import RemarkModal from "../../Components/Modal/RemarkModal";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";
import ic from "../../../ASSETS/ic.png";

export default function Staffinterview_details() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);

  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState({});
  const [interviewOverallStatus, setInterviewOverallStatus] = useState({});

  const handleOpenRemarkModal = (rowData) => {
    setRemarkModalOpen(true);
    setSelectedRowData(rowData);
  };

  const dispatch = useDispatch();
  const { Data, loading } = useSelector((state) => state.GetInterviewList);
  useEffect(() => {
    dispatch(GetInterviewList());
  }, [dispatch]);

  const handleOpenModal = (row) => {
    setSelectedCV(row);
    setOpen(true);
    setInterviewStatus((prev) => ({
      ...prev,
      [row.Email]: {
        FIS: "N/A",
        SIS: "N/A",
        TIS: "N/A",
      },
    }));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRowClick = (Reg_user_id) => {
    setSelectedRowID(Reg_user_id);
  };

  const handleInterviewStatusChange = (e, rowData, interviewType) => {
    const value = e.target.value;
    console.log(rowData);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setInterviewStatus((prev) => ({
          ...prev,
          [rowData.Email]: {
            ...prev[rowData.Email],
            [interviewType]: value,
          },
        }));
        const data = new FormData();
        data.append("InterviewStatus", value);
        data.append("ApplicantAppliedJobId", rowData.ApplicantAppJobid);
        data.append(
          "InterviewRoundId",
          interviewType === "FIS"
            ? rowData.FirstRoundId
            : interviewType === "SIS"
            ? rowData.SecondRoundId
            : interviewType === "TIS"
            ? rowData.ThirdRoundId
            : ""
        );
        data.append(
          "InterviewRoundNo",
          interviewType === "FIS"
            ? "1"
            : interviewType === "SIS"
            ? "2"
            : interviewType === "TIS"
            ? "3"
            : ""
        );

        dispatch(UpdateInterviewStatus(data));
        Swal.fire({
          title: "Status Changed!",
          text: "Selected candidate status has been changed !",
          icon: "success",
        });
      }
    });
  };

  const handleInterviewOverallStatusChange = (e, rowData, interviewType) => {
    const value = e.target.value;
    setInterviewOverallStatus((prev) => ({
      ...prev,
      [rowData.Email]: {
        ...prev[rowData.Email],
        [interviewType]: value,
      },
    }));
  };

  const SelectDropdown = ({ value, onChange, isActive }) => {
    return (
      <Select value={value} onChange={onChange} disabled={isActive}>
        <MenuItem value="N/A">N/A</MenuItem>
        <MenuItem value="P">Pass</MenuItem>
        <MenuItem value="F">Fail</MenuItem>
      </Select>
    );
  };
  const SelectedDropdown = ({ value, onChange }) => {
    return (
      <Select value={value} onChange={onChange}>
        <MenuItem value="PN">Pending</MenuItem>
        <MenuItem value="RJ">Rejected</MenuItem>
        <MenuItem value="CM">Completed</MenuItem>
      </Select>
    );
  };
  const sortedRows = useMemo(() => {
    if (sortedColumn) {
      return Data.slice().sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
        } else {
          return b[sortedColumn] > a[sortedColumn] ? 1 : -1;
        }
      });
    } else {
      return Data;
    }
  }, [Data, sortedColumn, sortOrder]);

  const checkIsActive = (rowData) => {
    let isActive;

    if (rowData.ThirdRoundId) {
      isActive = { FAS: true, SAS: true, TAS: false };
      return isActive;
    }

    if (rowData.SecondRoundId) {
      isActive = { FAS: true, SAS: false, TAS: true };
      return isActive;
    }

    if (rowData.FirstRoundId) {
      isActive = { FAS: false, SAS: true, TAS: true };
      return isActive;
    }

    isActive = { FAS: true, SAS: true, TAS: true };
    return isActive;
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
                Candidates Interview Details
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

          <TableContainer
            sx={{
              marginTop: "2%",
              maxwidth: "2%",
              maxHeight: 600,
            }}
            component={Paper}
          >
            <Table aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#4194c4" }}>
                <TableRow>
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
                  <TableCell align="center">1st Interview</TableCell>
                  <TableCell align="center">2nd Interview</TableCell>
                  <TableCell align="center">3rd Interview</TableCell>
                  <TableCell align="center">Status</TableCell>
                  {/* <TableCell align="center">Remark</TableCell> */}
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRows.map((row) => (
                  <TableRow
                    key={row.Email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleRowClick(row.Email)}
                    selected={selectedRowID === row.Email}
                    hover
                  >
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
                    <TableCell align="center">
                      <SelectDropdown
                        // value={interviewStatus[row.Email]?.FIS || "N/A"}

                        value={
                          interviewStatus[row.Email]?.FIS ||
                          row.FirstRoundStatus ||
                          "N/A"
                        }
                        onChange={(e) =>
                          handleInterviewStatusChange(e, row, "FIS")
                        }
                        isActive={checkIsActive(row).FAS}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <SelectDropdown
                        // value={interviewStatus[row.Email]?.SIS || "N/A"}
                        value={
                          interviewStatus[row.Email]?.SIS ||
                          row.SecondRoundStatus ||
                          "N/A"
                        }
                        onChange={(e) =>
                          handleInterviewStatusChange(e, row, "SIS")
                        }
                        isActive={checkIsActive(row).SAS}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <SelectDropdown
                        // value={interviewStatus[row.Email]?.TIS || "N/A"}
                        value={
                          interviewStatus[row.Email]?.TIS ||
                          row.ThirdRoundStatus ||
                          "N/A"
                        }
                        onChange={(e) =>
                          handleInterviewStatusChange(e, row, "TIS")
                        }
                        isActive={checkIsActive(row).TAS}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <SelectedDropdown
                        // value={
                        //   interviewOverallStatus[row.Email]?.overallStatus ||
                        //   "PN"
                        // }

                        // value={

                        //   ["RJ", "CM", "PN"].includes(row.InterviewStatus)
                        //     ? row.InterviewStatus
                        //     :  interviewOverallStatus[row.Email]?.overallStatus || "PN"
                        // }

                        value={
                          interviewOverallStatus[row.Email]?.overallStatus ||
                          (["RJ", "CM"].includes(row.InterviewStatus)
                            ? row.InterviewStatus
                            : "PN") ||
                          "PN"
                        }
                        onChange={(e) =>
                          handleInterviewOverallStatusChange(
                            e,
                            row,
                            "overallStatus"
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "lightyellow",
                          color: "black",
                        }}
                        onClick={() => handleOpenRemarkModal(row)}
                      >
                        Send & Save
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <RemarkModal
              open={remarkModalOpen}
              onClose={() => setRemarkModalOpen(false)}
              selectedRowData={selectedRowData}
              interviewOverallStatus={interviewOverallStatus}
            />
            <CVModal
              open={open}
              onClose={handleCloseModal}
              selectedCV={selectedCV}
              details={
                // sortedRows.find((row) => row.Reg_user_id === selectedRowID)?.Nic
                sortedRows.find((row) => row.Email === selectedRowID)?.Nic
              }
            />
          </TableContainer>
        </>
      )}
    </Box>
  );
}
