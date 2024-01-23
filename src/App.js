import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Staff_Dashboard from "./CDPLC_STAFF/Pages/Dashboard/Staff_Dashboard";
import Jobs_Layout from "./CDPLC_STAFF/Pages/Add Job/Jobs_Layout";
import Form_Layout from "./CDPLC_STAFF/Pages/Request Form/Form_Layout";
import Profile_Layout from "./CANDIDATES/pages/Profile/Profile_Layout";
import Admin_Dashboard from "./CDPLC_ADMIN/Pages/Admin Dashboard/Admin_Dashboard";
import Requests_Layout from "./CDPLC_ADMIN/Pages/Requests/Requests_Layout";
import Candidates_Layout from "./CDPLC_ADMIN/Pages/Candidates/Candidates_Layout";
import Selected_Layout from "./CDPLC_ADMIN/Pages/Selected Candidates/Selected_Layout";
import Register from "./CANDIDATES/pages/Register/Register";
import Login from "./CANDIDATES/pages/Login/Login";
import StepForm from "./CANDIDATES/pages/Form/StepForm";
import ForgotPassword from "./CANDIDATES/pages/Forgot_Password/ForgotPassword";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyHistory from "./CANDIDATES/pages/MyHistory/MyHistory";
import Dashboard_Layout from "./CANDIDATES/pages/Dashboard/Dashboard_Layout";
import History_Layout from "./CDPLC_STAFF/Pages/Request History/History_Layout";
import Staff_dashboard_Layout from "./CDPLC_STAFF/Pages/Dashboard/Staff_dashboard_Layout";

import ProtectedRoute from "./route/ProtectedRoute";
import User_Layout from "./CDPLC_ADMIN/Pages/Users/User_Layout";
import Create_job_Layout from "./CDPLC_ADMIN/Pages/Create Job/Create_job_Layout";

import StaffSelected_Layout from "./CDPLC_ADMIN/Pages/Staff Selected/StaffSelected_Layout";
import ApprovedAdmin_Layout from "./CDPLC_STAFF/Pages/Approved By Admin/ApprovedAdmin_Layout";
import ApprovedStaff_Layout from "./CDPLC_STAFF/Pages/Approved By Staff/ApprovedStaff_Layout";
import Admin_Dashboardlayout from "./CDPLC_ADMIN/Pages/Admin Dashboard/Admin_Dashboardlayout";
import Stffinterview_layout from "./CDPLC_STAFF/Pages/Interview Details/Stffinterview_layout";

import Panel_layout from "./CDPLC_STAFF/Pages/Create Panel/Panel_layout";
import PassedList_Layout from "./CDPLC_ADMIN/Pages/Interview Passed List/PassedList_Layout";
import Appointed_Candidates_Layout from "./CDPLC_STAFF/Pages/Appointed Candidates/Appointed_Candidates_Layout";
import NotFound from "./NotFound";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [reg_id, userType] = user ? user.split("/") : ["", ""];

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" autoClose={1500} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />

        <Route element={<ProtectedRoute userTypeAllowed="C" />}>
          <Route path="/dashboard" element={<Dashboard_Layout />} />
          <Route path="/form" element={<StepForm />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile_Layout />} />
          <Route path="/history" element={<MyHistory />} />
      
        </Route>

        <Route element={<ProtectedRoute userTypeAllowed="S" />}>
          <Route path="/staff_dashboard" element={<Staff_dashboard_Layout />} />
          <Route path="/Jobs_Layout" element={<Jobs_Layout />} />
          <Route path="/Form_Layout" element={<Form_Layout />} />
          <Route
            path="/ApprovedAdmin_Layout"
            element={<ApprovedAdmin_Layout />}
          />
          <Route
            path="/ApprovedStaff_Layout"
            element={<ApprovedStaff_Layout />}
          />
          <Route path="/Panel_layout" element={<Panel_layout />} />
          <Route
            path="/Appointed_Candidates_Layout"
            element={<Appointed_Candidates_Layout />}
          />
          <Route path="/History_Layout" element={<History_Layout />} />
          <Route
            path="/Stffinterview_layout"
            element={<Stffinterview_layout />}
          />
        </Route>

        <Route element={<ProtectedRoute userTypeAllowed="A" />}>
          <Route path="/admin_dashboard" element={<Admin_Dashboardlayout />} />
          <Route path="/Requests_Layout" element={<Requests_Layout />} />
          <Route path="/Candidates_Layout" element={<Candidates_Layout />} />
          <Route path="/Selected_Layout" element={<Selected_Layout />} />
          <Route path="/PassedList_Layout" element={<PassedList_Layout />} />
          <Route path="/User_Layout" element={<User_Layout />} />
          <Route path="/Create_job" exact element={<Create_job_Layout />} />
          <Route
            path="/StaffSelected_Layout"
            exact
            element={<StaffSelected_Layout />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
