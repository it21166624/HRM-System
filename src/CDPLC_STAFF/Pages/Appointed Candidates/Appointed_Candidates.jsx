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
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CVModal from "../../../CDPLC_ADMIN/Components/Modal/CVModal";
import Pdf_Reader from "../../../CDPLC_ADMIN/Components/Document/Pdf_Reader";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { StaffGetAppliedJobsUserList } from "../../../action/CDPLC_STAFF/StaffApprovedList";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";
import ic from "../../../ASSETS/ic.png";
import { StaffUpdateAppointmentStatus } from "../../../action/CDPLC_STAFF/StaffUpdateAppointmentStatusAction";
import { getAppointCandidates } from "../../../action/CDPLC_STAFF/InterviewPanelActoion";
// import { StaffSMSAction } from "../../../action/CDPLC_STAFF/StaffSMSAction";

export default function Appointed_Candidates() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const { Data, loading } = useSelector((state) => state.getAppointCandidates);

  useEffect(() => {
    dispatch(getAppointCandidates());
  }, [dispatch, refresh]);

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
  const handleRowClick = (Reg_user_id) => {
    setSelectedRowID(Reg_user_id);
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
    } else if (Data) {
      return Data;
    } else {
      return [];
    }
  }, [Data, sortedColumn, sortOrder]);

  // const sortedRows = useMemo(() => {
  //   if (sortedColumn) {
  //     return data.slice().sort((a, b) => {
  //       if (sortOrder === "asc") {
  //         return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
  //       } else {
  //         return b[sortedColumn] > a[sortedColumn] ? 1 : -1;
  //       }
  //     });
  //   } else {
  //     return data;
  //   }
  // }, [data, sortedColumn, sortOrder]);

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

  const showConfirmationDialog = (row) => {
    // console.log("Item:", item);
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to accept the request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(item);
        dispatch(StaffUpdateAppointmentStatus(row.AppointmentId));
        // dispatch(StaffSMSAction(row.RegUserMobile));
        setRefresh((prevRefresh) => !prevRefresh);
        Swal.fire(
          "Appointed!",
          "The candidates have been accepted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The request has been cancelled.", "error");
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
                Appointed Candidates
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
              <TableHead
                style={{
                  backgroundColor: "#4194c4",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableRow>
                  {/* <TableCell align="center">ID</TableCell> */}

                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Mobile</TableCell>
                  <TableCell align="left">Appointed Date</TableCell>
                  <TableCell align="left">Remark</TableCell>
                  {/* <TableCell
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
                  </TableCell> */}
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows.map((row) => (
                  <TableRow
                    key={row.RegUserId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleRowClick(row.RegUserId)}
                    selected={selectedRowID === row.RegUserId}
                    hover
                  >
                    <TableCell align="left">{row.RegUserName}</TableCell>
                    <TableCell align="left">{row.RegUserEmail}</TableCell>
                    <TableCell align="left">{row.RegUserMobile}</TableCell>
                    <TableCell align="left">{row.AppointmentDate}</TableCell>
                    <TableCell align="left">{row.Remarks}</TableCell>
                    {/* <TableCell
                      align="left"
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      {row.Email}
                    </TableCell> */}
                    {/* <TableCell
                      align="center"
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      {row.Mobile_no}
                    </TableCell> */}
                    <TableCell align="center">
                      <Button
                        type="button"
                        variant="contained"
                        sx={{
                          backgroundColor:
                            row.AppointmentStaus === "Y" ? "red" : "green",
                          color: "white",
                        }}
                        onClick={() => showConfirmationDialog(row)}
                        disabled={row.AppointmentStaus === "Y"}
                      >
                        {row.AppointmentStaus === "Y" ? "Appointed" : "Appoint"}
                      </Button>
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
