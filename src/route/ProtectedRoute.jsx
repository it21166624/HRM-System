import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ userTypeAllowed }) => {
  const { user } = useSelector((state) => state.auth);
  // const [reg_id, userType] = user ? user.split("/") : ["", ""];

  axios.defaults.headers.common["auth-key"] = JSON.parse(
    localStorage.getItem("cdl_hrm_token")
  );
  let userType = JSON.parse(localStorage.getItem("userType"));

  return userType === userTypeAllowed ? <Outlet /> : <Navigate to="/404" />;
};
export default ProtectedRoute;
