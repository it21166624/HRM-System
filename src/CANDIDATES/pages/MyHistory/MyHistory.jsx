import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Can_Navbar from "../../components/Navbar/Can_Navbar";
import Can_Sidenav from "../../components/Sidenav/Can_Sidenav";
import MyHistory_Details from "./MyHistory_Details";
import { useDispatch } from "react-redux";
import C_Navbar from "../../components/Navbar/C_Navbar";
import { GetAppliedJobsHistory } from "../../../action/CANDIDATES/CandidateJobAction";
export default function MyHistory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetAppliedJobsHistory()
    );
  }, [dispatch]);

  return (
    <>
     <C_Navbar/>
      {/* <Can_Navbar />
      <Can_Sidenav /> */}
      {/* <div className="bgcolor"> */}
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Grid item xs={8}>
            <MyHistory_Details />
            <Box height={20} />
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}
