import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorkersPage from "./pages/Workerspage/WorkersPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrderPage from "./pages/OrderPage/OrderPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/workers" element={isAuthenticated ? <WorkersPage /> : <Navigate to="/login" />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={isAuthenticated ? <OrderPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
