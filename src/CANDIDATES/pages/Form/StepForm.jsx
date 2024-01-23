import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Can_Sidenav from "../../components/Sidenav/Can_Sidenav";
import Can_Navbar from "../../components/Navbar/Can_Navbar";
import Checkout from "../Form/Checkout";
import Box from "@mui/material/Box";
import C_Navbar from "../../components/Navbar/C_Navbar";
import { useLocation } from "react-router-dom";

export default function Form({ route }) {
  const location = useLocation();
  // useEffect(() => {
  //     // setdefLockData(location.state.formdef_data)
  //     console.log("data",location.state)
  //   }, []);

  return (
    <>
      {/* <Can_Navbar />
      <Can_Sidenav /> */}
      <C_Navbar/>
      {/* <div className="bgcolor"> */}
      <Box height={70} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
 
        <Box component="main">
          <Grid item xs={8}>
            <Checkout jobData={location.state} />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
