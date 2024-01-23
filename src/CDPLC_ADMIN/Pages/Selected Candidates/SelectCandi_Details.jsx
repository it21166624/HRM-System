import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SelectCandi_Details({ open, onClose, row }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selected Candidate Details</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {row && (
          <Grid container spacing={2}>
            {/* <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                ID:
              </Typography>
            </Grid> */}
            {/* <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.ID}</Typography>
            </Grid> */}
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                ID:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.ID}</Typography>
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Date:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Date}</Typography>
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Name:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Name}</Typography>
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Position:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Position}</Typography>
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Department:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Department}</Typography>
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Email}</Typography>
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Tel_No:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.TelNo}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
