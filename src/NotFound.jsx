import React from "react";
import { Link } from "react-router-dom";
import errorpage from "../src/ASSETS/404.jpg";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Adjusted to column layout
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={errorpage}
        alt="404 Error"
        style={{ width: "700px", height: "700px", objectFit: "cover" }}
      />

      {/* Add an attractive button to go back to the login page */}
      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF", // Choose your preferred color
            color: "#fff", // Choose your preferred text color
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Back to Login
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
