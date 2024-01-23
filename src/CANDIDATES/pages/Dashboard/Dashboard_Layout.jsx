import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Can_Navbar from "../../components/Navbar/Can_Navbar";
import C_Navbar from "../../components/Navbar/C_Navbar";
import Can_Sidenav from "../../components/Sidenav/Can_Sidenav";
import Dashboard from "./Dashboard";
export default function Dashboard_Layout() {
  return (
    <>
      {/* <Can_Navbar /> */}
      {/* <div className="bgcolor"> */}
      <C_Navbar/>
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Can_Sidenav />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Grid item xs={8}>
            <Dashboard />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
