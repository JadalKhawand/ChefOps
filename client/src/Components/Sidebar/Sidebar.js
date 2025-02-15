import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };
  return (
    <aside className="custom-sidebar">
      <nav>
        <ul>
          <li><Link to="/workers">Manage Workers</Link></li>
          <li><Link to="/menu">Manage Menu</Link></li>
          <li><Link to="/orders">Manage Orders</Link></li>
          <li>
          {localStorage.getItem("token") && (
          <div className="logout-btn" onClick={handleLogout}>
            Logout
          </div>
        )}
          </li>
          
        </ul>
      </nav>
      <div className="custom-sidebar-footer">
        <button className="custom-email-btn">Contact Support</button>
        <button className="custom-terms-btn">Terms & Conditions</button>
      </div>
    </aside>
  );
};

export default Sidebar;
