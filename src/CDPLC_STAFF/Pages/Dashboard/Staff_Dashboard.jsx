import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import AppWebsiteVisits from "../../../dashboard_theme/View/app-website-visits";
import AppWidgetSummary from "../../../dashboard_theme/View/app-widget-summary";

import bag from "../../../dashboard_theme/dashboard_img/bag.png";
import glass from "../../../dashboard_theme/dashboard_img/glass.png";
import message from "../../../dashboard_theme/dashboard_img/message.png";
import users from "../../../dashboard_theme/dashboard_img/users.png";
import connect from "../../../dashboard_theme/dashboard_img/connect.png";

import { useDispatch, useSelector } from "react-redux";
import { StaffDashboardAction } from "../../../action/CDPLC_STAFF/StaffDashboardAction";

const Staff_Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, data, msg } = useSelector(
    (state) => state.StaffDashboardReducer
  );

  useEffect(() => {
    dispatch(StaffDashboardAction());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={2}>
            <AppWidgetSummary
              title="Section Requested Job Count "
              total={data ? data.RequestedJobCnt : 0}
              color="success"
              icon={<img alt="icon" src={glass} />}
              sx={{ backgroundColor: "#FEF5E5" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <AppWidgetSummary
              title="Approved Candidate Count"
              total={data ? data.ApprovedCandidateCnt : 0}
              color="info"
              icon={<img alt="icon" src={users} />}
              sx={{ backgroundColor: "#E8F7FF" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <AppWidgetSummary
              title="Selected Candidate Count"
              total={data ? data.SelectedCandidateCnt : 0}
              color="error"
              icon={<img alt="icon" src={bag} />}
              sx={{ backgroundColor: "#E6FFFA" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <AppWidgetSummary
              title="Interview Passed List Count"
              total={data ? data.InterviewPassedListCnt : 0}
              color="error"
              icon={<img alt="icon" src={users} />}
              sx={{ backgroundColor: "#EBF3FE" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <AppWidgetSummary
              title="Interview Pending List Count"
              total={data ? data.InterviewPendingListCnt : 0}
              color="error"
              icon={<img alt="icon" src={users} />}
              sx={{ backgroundColor: "#EBF3FE" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <AppWidgetSummary
              title="Appointed Candidate Count"
              total={data ? data.AppointedCandidateCnt : 0}
              color="error"
              icon={<img alt="icon" src={users} />}
              sx={{ backgroundColor: "#EBF3FE" }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Applied Details"
              chart={{
                labels: [
                  "01/11/2023",
                  "01/12/2023",
                  "01/01/2024",
                  "01/02/2024",
                  "01/03/2024",
                  "01/04/2024",
                  "01/05/2024",
                  "01/06/2024",
                  "01/07/2024",
                  "01/08/2024",
                  "01/09/2024",
                ],
                series: [
                  {
                    name: "Requested Job Count",
                    type: "column",
                    fill: "solid",
                    // data: [data.RequestedJobCnt],
                    data: data ? [data.RequestedJobCnt] : [],
                  },
                  // {
                  //   name: "Applied Candidate Count",
                  //   type: "area",
                  //   fill: "gradient",
                  //   data: [data.AppliedCandidateCnt],
                  // },
                  {
                    name: "Interview Passed List Count",
                    type: "line",
                    fill: "solid",
                    // data: [data.InterviewPassedListCnt],
                    // data: data ? [data.InterviewPassedListCnt] : [],
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          {/* <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chart={{
                series: [
                  { label: "America", value: 4344 },
                  { label: "Asia", value: 5435 },
                  { label: "Europe", value: 1443 },
                  { label: "Africa", value: 4443 },
                ],
              }}
            />
          </Grid> */}

          {/* <Grid xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chart={{
                series: [
                  { label: "Italy", value: 400 },
                  { label: "Japan", value: 430 },
                  { label: "China", value: 448 },
                  { label: "Canada", value: 470 },
                  { label: "France", value: 540 },
                  { label: "Germany", value: 580 },
                  { label: "South Korea", value: 690 },
                  { label: "Netherlands", value: 1100 },
                  { label: "United States", value: 1200 },
                  { label: "United Kingdom", value: 1380 },
                ],
              }}
            />
          </Grid> */}

          {/* <Grid xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chart={{
                categories: [
                  "English",
                  "History",
                  "Physics",
                  "Geography",
                  "Chinese",
                  "Math",
                ],
                series: [
                  { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                  { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                  { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
                ],
              }}
            />
          </Grid> */}

          {/* <Grid xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: faker.person.jobTitle(),
                description: faker.commerce.productDescription(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: [
                  "1983, orders, $4220",
                  "12 Invoices have been paid",
                  "Order #37745 from September",
                  "New order placed #XF-2356",
                  "New order placed #XF-2346",
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: "FaceBook",
                  value: 323234,
                  icon: (
                    <Iconify
                      icon="eva:facebook-fill"
                      color="#1877F2"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Google",
                  value: 341212,
                  icon: (
                    <Iconify
                      icon="eva:google-fill"
                      color="#DF3E30"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Linkedin",
                  value: 411213,
                  icon: (
                    <Iconify
                      icon="eva:linkedin-fill"
                      color="#006097"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Twitter",
                  value: 443232,
                  icon: (
                    <Iconify
                      icon="eva:twitter-fill"
                      color="#1C9CEA"
                      width={32}
                    />
                  ),
                },
              ]}
            />
          </Grid> */}

          {/* <Grid xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: "1", name: "Create FireStone Logo" },
                { id: "2", name: "Add SCSS and JS files if required" },
                { id: "3", name: "Stakeholder Meeting" },
                { id: "4", name: "Scoping & Estimations" },
                { id: "5", name: "Sprint Showcase" },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default Staff_Dashboard;
