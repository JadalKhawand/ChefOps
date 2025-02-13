import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorkersPage from "./pages/Workerspage/WorkersPage";
import MenuPage from "./pages/MenuPage/MenuPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/menu" element={<MenuPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

