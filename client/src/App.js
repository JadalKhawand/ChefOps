import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorkersPage from "./pages/Workerspage/WorkersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<WorkersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

