import React, { useState, useEffect } from 'react';
import './Orders.css';  
import { toast } from "react-toastify";
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = () => {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    console.log(2);
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
        toast.success("Orders fetched successfully");
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (url) {
      console.log("1")
      fetchAllOrders();
    }
  }, [url]);

  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p><b>Total:</b> ${order.amount}</p>
              <p><b>Status:</b> {order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
