import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Can_Navbar from "../../components/Navbar/Can_Navbar";
import C_Navbar from "../../components/Navbar/C_Navbar";
import Can_Sidenav from "../../components/Sidenav/Can_Sidenav";
import Profile from "./Profile";
export default function Profile_Layout() {
  return (
    <>
      {/* <Can_Navbar />
      <Can_Sidenav /> */}
         <C_Navbar/>
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Grid item xs={8}>
            <Profile />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
    </>
  );
}
