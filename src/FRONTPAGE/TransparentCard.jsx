// TransparentCard.js
import React from "react";
import "./TransparentCard.css"; // Import the CSS file

const TransparentCard = () => {
  return (
    <div className="card">
      <div className="content">
        {/* Your card content goes here */}
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default TransparentCard;
