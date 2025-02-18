import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import "./Workers.css";

const API_URL = "http://127.0.0.1:8000/api/workers";

const WorkersPage = () => {
  const [workers, setWorkers] = useState([]);
  const [editingWorker, setEditingWorker] = useState(null);
  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [addWorkerBox, setAddWorkerBox] = useState(false);
  const [editWorkerBox, setEditWorkerBox] = useState(false); 

  useEffect(() => {
    fetchWorkers(); 
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data)
      setWorkers(response.data);

    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleAddWorker = async () => {
    if (!newWorker.name || !newWorker.email || !newWorker.password || !newWorker.role) {
      alert("Please fill in all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newWorker.name);
    formData.append("email", newWorker.email);
    formData.append("password", newWorker.password);
    formData.append("role", newWorker.role);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setWorkers([...workers, response.data]);
      fetchWorkers();
      setNewWorker({ name: "", email: "", password: "", role: "" });
      setAddWorkerBox(false); 
    } catch (error) {
      console.error("Error adding worker:", error.response?.data || error.message);
    }
  };

  const deleteWorker = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setWorkers(workers.filter(worker => worker.id !== id));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const startEditing = (worker) => {
    setEditingWorker({ ...worker }); 
    setEditWorkerBox(true); 
  };

  const handleUpdate = async () => {
    if (!editingWorker) return;

    try {
      const response = await axios.put(`${API_URL}/${editingWorker.id}`, editingWorker);
      setWorkers(
        workers.map(worker =>
          worker.id === editingWorker.id ? response.data : worker
        )
      );
      fetchWorkers();
      setEditWorkerBox(false);
      setEditingWorker(null);

    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingWorker(prev => ({ ...prev, [name]: value }));
  };

  const closeEditForm = () => {
    setEditWorkerBox(false);
    setEditingWorker(null);
  };


  return (
    <div className="page-container">
      <Sidebar />
      <div className="workers-container">
        <div className="header">
          <h2>Manage Workers</h2>
          <button className="add-worker" onClick={() => setAddWorkerBox(true)}>Add New Worker</button>
        </div>

          <div className="workers-list">
            {workers.map((worker, index) => (
              <div key={worker.id || index} className="worker-card">  
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


        {addWorkerBox && (
          <div className="add-formy-overlay">
            <div className="add-form">
              <h3>Add Worker</h3>
              <input type="text" name="name" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} placeholder="Name" />
              <input type="email" name="email" value={newWorker.email} onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })} placeholder="Email" />
              <input type="password" name="password" value={newWorker.password} onChange={(e) => setNewWorker({ ...newWorker, password: e.target.value })} placeholder="Password" />
              <input type="text" name="role" value={newWorker.role} onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })} placeholder="Role" />
              <div className="actions">

                <button className="save-btn" onClick={handleAddWorker}>Save</button>
                <button className="cancel-btn" onClick={() => setAddWorkerBox(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {editWorkerBox && editingWorker && (
          <div className="add-formy-overlay">
            <div className="add-form">
              <h3>Edit Worker</h3>
              <input type="text" name="name" value={editingWorker.name} onChange={handleInputChange} placeholder="Name" />
              <input type="email" name="email" value={editingWorker.email} onChange={handleInputChange} placeholder="Email" />
               <input type="password" name="password" value={editingWorker.password} onChange={handleInputChange} placeholder="Password" />
              <input type="text" name="role" value={editingWorker.role} onChange={handleInputChange} placeholder="Role" />
              <div className="actions">
                <button className="save-btn" onClick={handleUpdate}>Save</button>
                <button className="cancel-btn" onClick={closeEditForm}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkersPage;