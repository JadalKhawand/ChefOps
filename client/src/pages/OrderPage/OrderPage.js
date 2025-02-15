import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./OrderPage.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders"); 
      setMenus(response.data);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="orders-container">
        <div className="header">
          <h2>Manage Orders</h2>
          
        </div>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <strong>Order #{order.id}</strong>
                <p>Customer: {order.customer}</p>
                <p>Items: {order.items}</p>
                <p>Total: {order.total}</p>
              </div>
              <div className="actions">                
                <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
