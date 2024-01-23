import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar/Navbar";
import Sidenav from "../../Components/Sidenav/Sidenav";
import Staff_Dashboard from "./Staff_Dashboard";
export default function Staff_dashboard_Layout() {
  return (
    <>
      <Navbar />
      {/* <div className="bgcolor"> */}
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={8}>
            <Staff_Dashboard />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
