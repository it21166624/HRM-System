import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import GridLoader from "react-spinners/GridLoader";
const CustomLoader = ({ text }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <CircularProgress style={{ marginBottom: "16px" }} /> */}
      <GridLoader color="rgba(15, 126, 232, 0.81)" size={20} />
      {/* <Typography variant="body2">{text}</Typography> */}
    </Box>
  );
};

export default CustomLoader;
