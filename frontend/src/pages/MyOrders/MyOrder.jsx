import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets/frontend_assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
          <div className='container'>
            {data.map((order, index) => (
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="parcel" />
                    <p>
                        {order.items.map((item, idx) => {
                            const itemStr = `${item.name} x ${item.quantity}`;
                            return idx === order.items.length - 1 ? itemStr : `${itemStr}, `;
                        })}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>  
                    <button>Track Order</button> 

                </div>
            ))}
            </div>
        </div>
    );
};

export default MyOrders;
