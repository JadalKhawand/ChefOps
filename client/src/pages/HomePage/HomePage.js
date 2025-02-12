import React from "react";
import "./HomePage.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

const HomePage = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1 className="restaurant-name">ChefOps Admin Panel</h1>
          <h2 className="welcome-text">Manage your restaurant efficiently.</h2>
        </header>
        
        {/* Image Section */}
        <div className="image-container">
          <img src="./images/welcome.jpg"alt="Restaurant Overview" className="center-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
