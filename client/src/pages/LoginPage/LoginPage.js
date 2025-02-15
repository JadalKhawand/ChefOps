import React from "react";
import "./LoginPage.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png"
          alt="Admin Illustration"
          className="login-image"
        />
      </div>
      <div className="login-right">
        <h2 className="login-title">Log in</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="admin@restaurantui" />
          <label>Password</label>
          <input type="password" placeholder="**********" />
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
