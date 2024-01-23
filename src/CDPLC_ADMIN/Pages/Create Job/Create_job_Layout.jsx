import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import AdminSidenav from "../../Components/Sidenav/AdminSidenav";

export default function Create_job_Layout() {
  return (
    <>
      <AdminNavbar />
      <div className="bgcolor">
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Grid item xs={8}>
              <Box height={20} />
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
