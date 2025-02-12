import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"; // Import your Sidebar component
import "./Workers.css";

const WorkersPage = () => {
  const [workers, setWorkers] = useState([
    { id: 1, name: "Alex Johnson", role: "Chef", email: "alex.johnson@example.com" },
    { id: 2, name: "Jessica Adams", role: "Waitress", email: "jessica.adams@example.com" },
    { id: 3, name: "Michael Lee", role: "Bartender", email: "michael.lee@example.com" },
  ]);

  const handleEdit = (id) => {
    console.log("Edit worker with ID:", id);
  };

  const handleDelete = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  return (
    <div className="page-container">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="workers-container">
        <div className="header">
          <h2>Manage Workers</h2>
          <button className="add-worker">Add New Worker</button>
        </div>
        <div className="workers-list">
          {workers.map(worker => (
            <div key={worker.id} className="worker-card">
              <div className="worker-info">
                <strong>{worker.name}</strong>
                <p>{worker.role} | <a href={`mailto:${worker.email}`}>{worker.email}</a></p>
              </div>
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(worker.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(worker.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;
