import MoreIcon from "@mui/icons-material/More";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSummery } from "../../../action/CANDIDATES/CandidateSummery";
import { AdminGetAllJobs } from "../../../action/CANDIDATES/CandidateJobAction";
import mainLogo from "../../../ASSETS/mainlogo.png";
import logo from "../../../ASSETS/logo.png";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, fontSize } from "@mui/system";
import cv from "../../../ASSETS/cv.png";
import JobModal from "./JobModal";

const Dashboard = () => {
  // const [filter, setFilter] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [jobsFound, setJobsFound] = useState(true);
  const handleClickOpen = (item) => {
    setSelectedJob(item);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setFilter(searchTerm);

    const filteredJobs = data.filter((item) => {
      const jobPosition = item.Job_position.toLowerCase();
      const sectionalName = item.Sectional_name.toLowerCase();
      return (
        jobPosition.includes(searchTerm) || sectionalName.includes(searchTerm)
      );
    });

    setJobsFound(filteredJobs.length > 0);
    setFilteredData(filteredJobs);
  };

  const { data } = useSelector((state) => state.getAllJobs);
  useEffect(() => {
    dispatch(getSummery(""));
    dispatch(AdminGetAllJobs());
  }, [dispatch]);

  return (
    <Box >
      <>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            backgroundImage: `url(${cv})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: 450,
          }}
        >
          <Box sx={{ ml: "5%", mt: "5%" }}>
            <Typography
              gutterBottom
              variant="h4"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Find Your Dream Job
            </Typography>

       
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "20px",
                  marginBottom: "8px", 
                  width: "100%",
                }}
              >
                <SearchIcon style={{ marginLeft: "8px", color: "#757575" }} />
                <InputBase
                  placeholder="Search..."
                  onChange={handleFilterChange}
                  inputProps={{ "aria-label": "search" }}
                  style={{
                    flex: 1,
                    marginLeft: "8px",
                    padding: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          </Box>
        </Card>

        <Box
          style={{
            padding: "2px 50px",
            margin: "20px 50px 0",
          }}
        >
            {jobsFound ? (
          <Grid container spacing={5}>
            {(filter ? filteredData : data).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  key={item.id}
                  sx={{
                    marginBottom: 2,
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "2px 2px 6px  rgba(0, 0, 153, 0.2)",
                    borderColor: "blue",
                  }}
                >
                  <CardContent>
                    <Box>
                      <Grid>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "#1F618D",
                          }}
                        >
                          {item.Job_position}
                        </Typography>
                        <Grid
                          sx={{
                            mt: "2%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between", // Adjust as needed
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "17px",
                              color: "#5499C7",
                            }}
                          >
                            In {item.Sectional_name} Department
                          </Typography>

                          {/* <Typography
                            variant="body1"
                            sx={{
                              fontSize: "10px",
                              width: "108px",
                              height: "20px",
                              backgroundColor: "#01be7e",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              borderRadius: "2px",
                            }}
                          >
                            FULL TIME
                          </Typography> */}

                          {/* <span
                            style={{ fontSize: "18px", fontWeight: "bolder" }}
                          >
                            <LocationOnIcon
                              style={{ fontSize: "20px", marginRight: "10px" }}
                            />
                            Colombo
                          </span> */}
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardContent>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label="Full Time "
                        sx={{ color: "#4A235A", backgroundColor: "#E8DAEF" }}
                      />
                      {/* <Chip
                        label="$100-$200/month"
                        sx={{ color: "#1B4F72", backgroundColor: "#D6EAF8" }}
                      /> */}
                      <Chip
                        label="Colombo"
                        sx={{ color: "#145A32", backgroundColor: "#D5F5E3" }}
                        icon={<LocationOnIcon />}
                      />
                    </Stack>
                  </CardContent>
                  {/* <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <Chip
                          label="$100-$200/month"
                          sx={{ color: "#1B4F72", backgroundColor: "#D6EAF8" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Chip
                          label="Colombo"
                          sx={{ color: "#145A32", backgroundColor: "#D5F5E3" }}
                          icon={<LocationOnIcon />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Chip
                          label="Full Time"
                          sx={{ color: "#4A235A", backgroundColor: "#E8DAEF" }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent> */}
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "red" }}>
                        Closing Date{" "}
                        {item != null
                          ? dayjs(item.Job_End_Date).format("YYYY-MM-DD")
                          : ""}
                      </span>

                      <IconButton aria-label="previous">
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          endIcon={<MoreIcon />}
                          onClick={() => {
                            handleClickOpen(item);
                          }}
                        >
                          View
                        </Button>
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ):(  <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "grey", textAlign: "center", marginTop: "30px" }}
            >
              No Job Found
            </Typography>
          )}
          <JobModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            selectedJob={selectedJob}
          />
        </Box>
      </>
    </Box>
  );
};

export default Dashboard;
