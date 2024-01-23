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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getHistory,
  updateJobStatusDetails,
} from "../../../action/CDPLC_STAFF/StaffRequestHistory";
import RequestDetailsModal from "./RequestDetailsModal";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";
import ic from "../../../ASSETS/ic.png";

// function createData(ID, Date, Position, NoPosition, Status) {
//   return { ID, Date, Position, NoPosition, Status };
// }

export default function Request_History() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.getHistory);
  const { loading: updateLoad } = useSelector(
    (state) => state.updateJobStatusDetails
  );
  useEffect(() => {
    dispatch(getHistory());
  }, [updateLoad]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [selectedModalRow, setSelectedModalRow] = useState(null);

  const [switchStates, setSwitchStates] = useState(true);

  // const handleSwitchChange = (Job_id) => {
  //   dispatch(updateJobStatusDetails(Job_id));
  // };

  const handleSwitchChange = (Job_id) => {
    Swal.fire({
      title: "Deactivate Request",
      text: "Are you sure you want to deactivate this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateJobStatusDetails(Job_id));
        const updatedData = data.filter((item) => item.Job_id !== Job_id);
        dispatch({ type: "UPDATE_HISTORY_DATA", payload: updatedData });
        Swal.fire(
          "Deactivated!",
          "The request has been deactivated.",
          "success"
        );
      } else {
        Swal.fire("Cancelled", "The request was not deactivated.", "info");
      }
    });
  };

  //Short List
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
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
        ? a.Active.localeCompare(b.Active)
        : b.Active.localeCompare(a.Active);
    }
    return 0;
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //active Button

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
                Request History
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
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortBy === "Date"}
                      direction={sortBy === "Date" ? sortOrder : "asc"}
                      onClick={() => handleSort("Date")}
                    >
                      Created Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortBy === "Position"}
                      direction={sortBy === "Position" ? sortOrder : "asc"}
                      onClick={() => handleSort("Position")}
                    >
                      Position
                    </TableSortLabel>
                  </TableCell>

                  {/* <TableCell align="center">Start Date</TableCell>

                  <TableCell align="center">End Date</TableCell> */}

                  <TableCell align="center">
                    <TableSortLabel
                      active={sortBy === "Status"}
                      direction={sortBy === "Status" ? sortOrder : "asc"}
                      onClick={() => handleSort("Status")}
                    >
                      Status
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
                  .map((item, index) => (
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
                      <TableCell component="th" scope="row" align="center">
                        {item.Created_date}
                      </TableCell>

                      <TableCell align="center">{item.Job_position}</TableCell>
                      {/* <TableCell align="center">{item.Job_Start_Date}</TableCell>
                  <TableCell align="center">{item.Job_End_Date}</TableCell> */}
                      {/* <TableCell align="center">
                        {
                          new Date(item.Job_Start_Date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
                      <TableCell align="center">
                        {
                          new Date(item.Job_End_Date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell> */}
                      {/* <TableCell align="center">
                        {item.Job_Start_Date instanceof Date
                          ? item.Job_Start_Date.toISOString().split("T")[0]
                          : "Invalid Start Date"}
                      </TableCell>
                      <TableCell align="center">
                        {item.Job_End_Date instanceof Date
                          ? item.Job_End_Date.toISOString().split("T")[0]
                          : "Invalid End Date"}
                      </TableCell> */}
                      {/* <TableCell align="center">
                    {" "}
                    <Switch
                      // checked={item.Is_active === "A" ? true : false}
                      checked={switchStates}
                      onChange={(event) => handleSwitchChange(item.Job_id)}
                    />
                  </TableCell> */}
                      <TableCell align="center">
                        <Button
                          type="button"
                          variant="contained"
                          onClick={(event) => {
                            handleSwitchChange(item.Job_id);
                          }}
                        >
                          {" "}
                          DEACTIVATE
                        </Button>

                        {/* <Button
                      type="button"
                      variant="contained"
                      style={{
                        color: "white", // Set text color
                        backgroundColor: "", // Set background color to red
                        width: "100%", // Set width to 100% for xs
                        fontSize: "0.8rem", // Adjust font size for sm and md
                        // Add more styles for other screen sizes as needed
                      }}
                      onClick={(event) => {
                        handleSwitchChange(item.Job_id);
                      }}
                    >
                      DEACTIVATE
                    </Button> */}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          type="button"
                          onClick={() => {
                            setSelectedModalRow(item);
                            setOpenModal(true);
                          }}
                        >
                          <PreviewIcon />
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

          <RequestDetailsModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            row={selectedModalRow}
          />
        </>
      )}
    </Box>
  );
}
