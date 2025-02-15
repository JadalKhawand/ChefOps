import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./OrderPage.css";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders");
      setOrders(response.data.orders); 
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



  const handleDelete = async (orderID) => {
    try {
      axios.delete(`http://localhost:8000/api/orders/${orderID}`).then(() => {
        setOrders(orders.filter((order) => order.orderID !== orderID));

      });
    } catch (error) {
      console.error("Error deleting order:", error);
      console.log(error.error);
      console.log(error.message);
      alert("There was an error deleting the order.");
    }
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
            <div key={order.orderID} className="order-card">
              <div className="order-info">
                <strong>Order #{order.orderID}</strong>
                <p>Total Price: ${order.totalPrice}</p>
                <div className="order-items">
                  {order.menu.map((item, index) => (
                    <div key={index} className="order-item">
                      <p>{item.menuName}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Total: ${item.totalPrice}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(order.orderID)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
