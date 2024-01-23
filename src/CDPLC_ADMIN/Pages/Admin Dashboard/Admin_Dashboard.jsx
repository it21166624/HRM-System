import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../../dashboard_theme/components/iconify";

import AppWebsiteVisits from "../../../dashboard_theme/View/app-website-visits";
import AppWidgetSummary from "../../../dashboard_theme/View/app-widget-summary";
import AppCurrentVisits from "../../../dashboard_theme/View/app-current-visits";
import AppConversionRates from "../../../dashboard_theme/View/app-conversion-rates";
import AppCurrentSubject from "../../../dashboard_theme/View/app-current-subject";
import AppNewsUpdate from "../../../dashboard_theme/View/app-news-update";
import AppOrderTimeline from "../../../dashboard_theme/View/app-order-timeline";
import AppTrafficBySite from "../../../dashboard_theme/View/app-traffic-by-site";

import bag from "../../../dashboard_theme/dashboard_img/bag.png";
import glass from "../../../dashboard_theme/dashboard_img/glass.png";
import message from "../../../dashboard_theme/dashboard_img/message.png";
import users from "../../../dashboard_theme/dashboard_img/users.png";
import connect from "../../../dashboard_theme/dashboard_img/connect.png";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

import { useDispatch, useSelector } from "react-redux";
import { AdminDashboardAction } from "../../../action/CDPLC_ADMIN/AdminDashboardAction";

const Admin_Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, data, msg } = useSelector(
    (state) => state.AdminDashboardReducer
  );

  useEffect(() => {
    dispatch(AdminDashboardAction());
  }, [dispatch]);

  const chartData = [
    { value: data?.AvailableVacancyCnt || 0, label: "Available" },
    { value: data?.AppliedCandidateCnt || 0, label: "Applied" },
    { value: data?.ApprovedCandidateCnt || 0, label: "Approved" },
    { value: data?.SelectedCandidateCnt || 0, label: "Selected" },
    { value: data?.InterviewPassedListCnt || 0, label: "InterviewPassed" },
  ];
  const darkColors = ["#FEF5E5", "#E8F7FF", "#FDEDE8", "#E6FFFA", "#EBF3FE"];
  const total = chartData.reduce((acc, { value }) => acc + value, 0);

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Available Vacancy Count"
              total={data ? data.AvailableVacancyCnt : 0}
              color="success"
              icon={<img alt="icon" src={glass} />}
              sx={{ backgroundColor: "#FEF5E5" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Applied Candidate Count"
              total={data ? data.AppliedCandidateCnt : 0}
              color="info"
              icon={<img alt="icon" src={users} />}
              sx={{ backgroundColor: "#E8F7FF" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Approved Candidate Count"
              total={data ? data.ApprovedCandidateCnt : 0}
              color="warning"
              icon={<img alt="icon" src={message} />}
              sx={{ backgroundColor: "#FDEDE8" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Selected Candidate Count"
              total={data ? data.SelectedCandidateCnt : 0}
              color="error"
              icon={<img alt="icon" src={bag} />}
              sx={{ backgroundColor: "#E6FFFA" }}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Interview Passed List Count"
              total={data ? data.InterviewPassedListCnt : 0}
              color="error"
              icon={<img alt="icon" src={connect} />}
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
                    name: "Available Vacancy Count",
                    type: "column",
                    fill: "solid",
                    // data: [data.AvailableVacancyCnt],
                    data: data ? [data.AvailableVacancyCnt] : [],
                  },
                  // {
                  //   name: "Applied Candidate Count",
                  //   type: "area",
                  //   fill: "gradient",
                  //   data: [data.AppliedCandidateCnt],
                  // },
                  {
                    name: "Applied Candidate Count",
                    type: "line",
                    fill: "solid",
                    // data: [data.AppliedCandidateCnt],
                    // data: data ? [data.AvailableVacancyCnt] : [],
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          {/* <Grid xs={12} md={6} lg={4}>
            <PieChart
              series={[
                {
                  arcLabel: (item) =>
                    `${item.label} (${((item.value / total) * 100).toFixed(
                      3
                    )}%)`,
                  arcLabelMinAngle: 45,
                  data: chartData,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "#9E9E9E",
                  fontWeight: "bold",
                  fontFamily: "YourFontFamily",
                  fontSize: 14,
                },
              }}
              width={700}
              height={270}
              colors={darkColors}
            />
          </Grid> */}

          <Grid xs={12} md={6} lg={4}>
          {data ? (
            <AppCurrentVisits
              title="All Details (%)"
              chart={{
                // series: [
                // { value: data.AvailableVacancyCnt, label: "Available" },
                // { value: data.AppliedCandidateCnt, label: "Applied" },
                // { value: data.ApprovedCandidateCnt , label: "Approved" },
                // { value: data.SelectedCandidateCnt , label: "Selected" },
                // { value: data.InterviewPassedListCnt , label: "InterviewPassed" },
                // ],
                series: [
                { value: 12, label: "Available" },
                { value: 25, label: "Applied" },
                { value: 74 , label: "Approved" },
                { value: 89 , label: "Selected" },
                { value: 85 , label: "InterviewPassed" },
                ],
              }}
            />
          ):(
            <p>Loading data...</p>
          )}
          </Grid>

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

export default Admin_Dashboard;
