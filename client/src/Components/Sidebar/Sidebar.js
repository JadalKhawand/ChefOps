import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="custom-sidebar">
      <nav>
        <ul>
          <li><Link to="/workers">Manage Workers</Link></li>
          <li><Link to="/menu">Manage Menu</Link></li>
          <li><Link to="/orders">Manage Orders</Link></li>
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
