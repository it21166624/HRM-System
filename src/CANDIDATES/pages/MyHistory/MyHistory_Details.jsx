import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RowDetailsModal from "./RowDetailsModal";
import { useSelector } from "react-redux";
import CustomLoader from "../../../CDPLC_ADMIN/Components/Modal/Loader";
import emp from "../../../ASSETS/emp.png";

function createData(ID, Date, Position, Status) {
  return { ID, Date, Position, Status };
}

export default function MyHistory_Details() {
  const [rows, setRows] = useState([
    createData(1001, "11/10/2023", "Software Engineer", "Complete"),
    createData(1002, "12/10/2023", "IT Administrator", "Incomplete"),
  ]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { data, loading } = useSelector((state) => state.getAppliedJobsHistory);

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.ID !== id);
    setRows(updatedRows);
    setShowSuccessMessage(true);
  };

  const handleOpenConfirmation = (row) => {
    setSelectedRow(row);
    setOpenConfirmation(true);
  };

  const handleConfirmationChoice = (choice) => {
    if (choice === "yes") {
      handleDeleteRow(selectedRow.ID);
    }
    setSelectedRow(null);
    setOpenConfirmation(false);
  };

  const handleSnackbarClose = () => {
    setShowSuccessMessage(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedModalRow, setSelectedModalRow] = useState(null);
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
              src={emp}
              alt="icon"
              style={{
                width: "6%",
                height: "auto",
                marginRight:"1%"
              }}
            />
          </Card>

          <TableContainer
            sx={{
              marginTop: "2%",
              maxwidth: "100%",
            }}
            component={Paper}
          >
            <Table aria-label="simple table" sx={{}}>
              <TableHead
                sx={{
                  backgroundColor: "#4194c4",
                }}
              >
                <TableRow>
                  {/* <TableCell align="center">ID</TableCell> */}
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{
                      borderRadius: 10, // Reduced the border radius
                      marginBottom: "16px", // Reduced the space between rows
                      transition: "background-color 0.3s, transform 0.3s",
                      "&:hover": {
                        backgroundColor: "#bbdefb",
                        //transform: "translateY(-5px)", // Adjusted the lift effect
                      },
                    }}
                    onClick={() => {
                      setSelectedModalRow(row);
                      setOpenModal(true);
                    }}
                  >
                    {/* <TableCell component="th" scope="row" align="center">
                  {row.ID}
                </TableCell> */}
                    <TableCell align="center">{row.Applied_date}</TableCell>
                    <TableCell align="center">{row.Job_Position}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            open={showSuccessMessage}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message="deleted successfully"
          />
        </>
      )}
    </Box>
  );
}
