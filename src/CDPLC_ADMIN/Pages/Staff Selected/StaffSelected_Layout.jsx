import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import AdminSidenav from "../../Components/Sidenav/AdminSidenav";
import StaffSelected_Details from "./StaffSelected_Details";

export default function StaffSelected_Layout() {
  return (
    <>
      <AdminNavbar />
      <div>
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Grid item xs={8}>
              <StaffSelected_Details />
              <Box height={20} />
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
