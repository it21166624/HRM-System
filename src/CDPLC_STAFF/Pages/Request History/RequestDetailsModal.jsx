import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RequestDetailsModal(props) {
  const { open, onClose, row } = props;
  // const [isActive, setIsActive] = useState(row.Is_active);

  // const handleActiveChange = () => {
  //   // Toggle the active status when the switch is clicked
  //   setIsActive(!isActive);
  // };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>History Details</DialogTitle>
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
            {/* <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                ID:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Job_id}</Typography>
            </Grid> */}
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Start Date:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Job_Start_Date}</Typography>
              {/* <Typography variant="body1">{new Date(row.Job_Start_Date).toISOString().split('T')[0]}</Typography> */}
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                End Date:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Job_End_Date}</Typography>
              {/* <Typography variant="body1">{new Date(row.Job_End_Date).toISOString().split('T')[0]}</Typography> */}
            </Grid>

            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Position:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Job_position}</Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Discription:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Job_description}</Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Requirment:
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Job_requirment}</Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                No.Position :
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Cnt}</Typography>
            </Grid>
            {/* <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Active Status :
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1">{row.Is_active}</Typography>
            </Grid> */}
            {/* <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
              <Typography variant="body1" color="textSecondary">
                Active Status :
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid #ccc" }}>
            
              <Switch
                checked={isActive}
                onChange={handleActiveChange}
                style={{
                  color: isActive ? "blue" : "red",
                }}
              />
            </Grid> */}
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
