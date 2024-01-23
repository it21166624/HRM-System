import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAppliedJobsDetails } from "../../../action/CDPLC_ADMIN/AdminAction";

export default function AppliedJobsModal(props) {
  const { open, onClose, selectedId } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAppliedJobsDetails);

  useEffect(() => {
    if(selectedId)
    {
      dispatch(GetAppliedJobsDetails(selectedId));
    }
    
  }, [dispatch, selectedId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Applied Vacancies {selectedId}</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#3498db", color: "white" }}>
                <TableCell>Applied Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Applied Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.Job_Position}</TableCell>
                    <TableCell>{row.Job_Section}</TableCell>
                    <TableCell>{row.Applied_date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="warning">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
