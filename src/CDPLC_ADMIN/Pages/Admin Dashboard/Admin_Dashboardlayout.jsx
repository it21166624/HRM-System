import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import AdminSidenav from "../../Components/Sidenav/AdminSidenav";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Admin_Dashboard from "./Admin_Dashboard";
export default function Admin_Dashboardlayout() {
  return (
    <>
      <AdminNavbar />
      {/* <div className="bgcolor"> */}
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <AdminSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={8}>
            <Admin_Dashboard />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
