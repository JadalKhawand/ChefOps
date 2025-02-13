import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import "./Workers.css";

const API_URL = "http://127.0.0.1:8000/api/workers"; 

const WorkersPage = () => {
  const [workers, setWorkers] = useState([]);
  const [editingWorker, setEditingWorker] = useState(null); // State to manage editing

  // Fetch workers from the backend
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setWorkers(response.data))
      .catch(error => console.error("Error fetching workers:", error));
  }, []);

  // Function to add a worker
  const addWorker = () => {
    const newWorker = {
      name: "New Worker",
      email: `worker${workers.length + 1}@example.com`,
      password: "password123",
      role: "Staff",
    };

    axios.post(API_URL, newWorker)
      .then(response => {
        setWorkers([...workers, response.data.worker]); // Update state
      })
      .catch(error => console.error("Error adding worker:", error));
  };

  // Function to delete a worker
  const deleteWorker = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setWorkers(workers.filter(worker => worker.id !== id)); // Remove from state
      })
      .catch(error => console.error("Error deleting worker:", error));
  };

  // Function to start editing a worker
  const startEditing = (worker) => {
    setEditingWorker(worker);
  };

  // Function to handle worker updates
  const handleUpdate = () => {
    if (!editingWorker) return;

    axios.put(`${API_URL}/${editingWorker.id}`, editingWorker)
      .then(response => {
        const updatedWorkers = workers.map(worker =>
          worker.id === editingWorker.id ? response.data.worker : worker
        );
        setWorkers(updatedWorkers); // Update state with edited worker
        setEditingWorker(null); // Reset editing state
      })
      .catch(error => console.error("Error updating worker:", error));
  };

  
  // Function to handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingWorker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="workers-container">
        <div className="header">
          <h2>Manage Workers</h2>
          <button className="add-worker" onClick={addWorker}>Add New Worker</button>
        </div>

        <div className="workers-list">
          {workers.map(worker => (
            <div key={worker.id} className="worker-card">
              <div className="worker-info">
                <strong>{worker.name}</strong>
                <p>{worker.role} | <a href={`mailto:${worker.email}`}>{worker.email}</a></p>
              </div>
              <div className="actions">
                <button className="edit-btn" onClick={() => startEditing(worker)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteWorker(worker.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editingWorker && (
          <div className="edit-form">
            <h3>Edit Worker</h3>
            <input
              type="text"
              name="name"
              value={editingWorker.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editingWorker.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="role"
              value={editingWorker.role}
              onChange={handleInputChange}
              placeholder="Role"
            />
            <button className="save-btn" onClick={handleUpdate}>Save</button>
            <button className="cancel-btn" onClick={() => setEditingWorker(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkersPage;
