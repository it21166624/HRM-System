import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar/Navbar";
import Sidenav from "../../Components/Sidenav/Sidenav";
import Approved_Admin from "./Approved_Admin";

export default function ApprovedAdmin_Layout() {
  return (
    <>
      <Navbar />
      <div >
      <Box height={60} />
      <Box sx={{ display: "flex"}}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Grid item xs={8}>
            <Approved_Admin />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      </div>
    </>
  );
}
