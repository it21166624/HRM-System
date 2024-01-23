import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar/Navbar";
import Sidenav from "../../Components/Sidenav/Sidenav";
import Add_Jobs from "./Add_Jobs";

export default function Jobs_Layout() {
  return (
    <>
      <Navbar />
      <div className="">
        <Box height={60} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Grid item xs={8}>
              <Add_Jobs />
              <Box height={20} />
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
