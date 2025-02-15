import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorkersPage from "./pages/Workerspage/WorkersPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrderPage from "./pages/OrderPage/OrderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/menu" element={<MenuPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

