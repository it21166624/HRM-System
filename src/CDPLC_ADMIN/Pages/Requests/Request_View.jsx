import PreviewIcon from "@mui/icons-material/Preview";
import {
  Box,
  Button,
  Card,
  CardContent,
  TablePagination,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  AcceptJobs,
  AdminGetJobDetails,
} from "../../../action/CDPLC_ADMIN/AdminAction";
import { getHistory } from "../../../action/CDPLC_STAFF/StaffRequestHistory";
import Addstartenddate_Modal from "../../Components/Modal/addstartenddate_modal";
import CustomLoader from "../../Components/Modal/Loader";
import icc from "../../../ASSETS/icc.png";

export default function Request_View() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.adminGetJobDetails);
  const { loading: updateLoad } = useSelector((state) => state.acceptJobs);
  const { loading: loading2 } = useSelector((state) => state.updateJobDates);

  useEffect(() => {
    dispatch(AdminGetJobDetails(""));
  }, [updateLoad, loading2]);

  const [sortBy, setSortBy] = useState(null); // Column to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order ('asc' or 'desc')
  const [openModal, setOpenModal] = useState(false);
  const [selectedModalRow, setSelectedModalRow] = useState(null);
  const [start_date, setstart_date] = useState(false);
  const [selectedModalsRow, setSelectedModalsRow] = useState(null);

  const [open, setOpen] = useState(false);
  const [preData, setPreData] = useState(null);

  const handleOpenModal = (dts) => {
    setPreData(dts);
    setOpen(true);
  };

  const handleCloseModal = () => {
    // dispatch(getHistory());
    setOpen(false);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      // If the same column is clicked, toggle the sorting order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the new sorting column
      setSortBy(column);
      setSortOrder("asc"); // Default sorting order for the new column
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "ID") {
      return sortOrder === "asc" ? a.Job_id - b.Job_id : b.Job_id - a.Job_id;
    } else if (sortBy === "Position") {
      return sortOrder === "asc"
        ? a.Job_position.localeCompare(b.Job_position)
        : b.Job_position.localeCompare(a.Job_position);
    } else if (sortBy === "NoPosition") {
      return sortOrder === "asc" ? a.Cnt - b.Cnt : b.Cnt - a.Cnt;
    } else if (sortBy === "Status") {
      return sortOrder === "asc"
        ? a.Is_active.localeCompare(b.Is_active)
        : b.Is_active.localeCompare(a.Is_active);
    }
    return 0; // Default case, no sorting
  });
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const showConfirmationDialog = (id) => {
    const selectedRequest = data.find((item) => item.Job_id === id);
    // {
    //   Swal.fire({
    //     title: "Confirm",
    //     text: "Are you sure you want to accept the request?",
    //     icon: "question",
    //     showCancelButton: true,
    //     confirmButtonText: "Yes",
    //     cancelButtonText: "No",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       dispatch(AcceptJobs(id));
    //       Swal.fire("Accepted!", "The request has been accepted.", "success");
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       // Do nothing if the user clicks "No"
    //       Swal.fire("Cancelled", "The request has been cancelled.", "error");
    //     }
    //   });
    // }
    if (selectedRequest.Job_Start_Date && selectedRequest.Job_End_Date) {
      Swal.fire({
        title: "Confirm",
        text: "Are you sure you want to accept the request?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(AcceptJobs(id));
          Swal.fire("Accepted!", "The request has been accepted.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "The request has been cancelled.", "error");
        }
      });
    } else {
      Swal.fire({
        title: "Warning",
        text: "You need to add dates before accepting the request.",
        icon: "warning",
      });
    }
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
                View Vacancies
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
              marginTop: "2%",
              // maxwidth: "2%",
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
                  {/* <TableCell align="center">
                <TableSortLabel
                  active={sortBy === "ID"}
                  direction={sortBy === "ID" ? sortOrder : "asc"}
                  onClick={() => handleSort("ID")}
                >
                  ID
                </TableSortLabel>
              </TableCell> */}
                  <TableCell align="left">
                    <TableSortLabel
                      active={sortBy === "Position"}
                      direction={sortBy === "Position" ? sortOrder : "asc"}
                      onClick={() => handleSort("Position")}
                    >
                      Position
                    </TableSortLabel>
                  </TableCell>
                  {/* 
              <TableCell align="center">
                <TableSortLabel
                  active={sortBy === "Status"}
                  direction={sortBy === "Status" ? sortOrder : "asc"}
                  onClick={() => handleSort("Status")}
                >
                  Status
                </TableSortLabel>
              </TableCell> */}

                  <TableCell align="center">
                    <TableSortLabel
                    // active={sortBy === "Status"}
                    // direction={sortBy === "Status" ? sortOrder : "asc"}
                    // onClick={() => handleSort("Status")}
                    >
                      Start Date
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="center">
                    <TableSortLabel
                    // active={sortBy === "Status"}
                    // direction={sortBy === "Status" ? sortOrder : "asc"}
                    // onClick={() => handleSort("Status")}
                    >
                      End Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel>Action</TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow
                      key={item.Job_id}
                      sx={{
                        borderRadius: 2,
                        transition: "background-color 0.3s, transform 0.3s",
                        "&:hover": {
                          backgroundColor: "#bbdefb",
                        },
                      }}
                    >
                      {/* <TableCell component="th" scope="row" align="center">
                    {item.Job_id}
                  </TableCell> */}

                      <TableCell align="left">{item.Job_position}</TableCell>
                      {/* 
                  <TableCell align="center">
                    {" "}
                    <Switch {...label} disabled defaultChecked />
                  </TableCell> */}
                      <TableCell align="center">
                        {item.Job_Start_Date === ""
                          ? "Date not set"
                          : dayjs(item.Job_Start_Date).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell align="center">
                        {item.Job_End_Date === ""
                          ? "Date not set"
                          : dayjs(item.Job_End_Date).format("MM-DD-YYYY")}
                      </TableCell>

                      <TableCell align="center">
                        {/* <Button
                      type="button"
                      onClick={() => {
                        setSelectedModalRow(item);
                        setOpenModal(true);
                      }}
                    >
                      <PreviewIcon />
                    </Button> */}
                        <Button
                          type="button"
                          variant="contained"
                          onClick={() => handleOpenModal(item)}
                          style={{ marginRight: "10px" }}
                        >
                          Add Date
                          {/* <MoreTimeIcon /> */}
                        </Button>
                        <Button
                          type="button"
                          variant="contained"
                          sx={{
                            backgroundColor:
                              item.Is_accepted === "Y" ? "red" : "green",
                            color: "white",
                          }}
                          onClick={() => showConfirmationDialog(item.Job_id)}
                          disabled={item.Is_accepted === "Y" ? true : false}
                        >
                          {item.Is_accepted === "Y" ? "Accepted" : "Accept"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            TableHead
            style={{
              backgroundColor: "#d3deef",
            }}
          />
          {/* 
      <RequestDetails_Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        row={selectedModalRow}
      /> */}

          <Addstartenddate_Modal
            open={open}
            onClose={handleCloseModal}
            date={preData}
            // st_date ={preData.Job_Start_Date}
            // ed_date ={preData.Job_End_Date}
          />
        </>
      )}
    </Box>
  );
}
