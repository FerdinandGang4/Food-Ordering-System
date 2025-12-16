



import React, { useEffect, useState } from "react";

import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder
} from "../services/Order_service";


function OrderList() {

  <h1>See</h1>
  /* ===================== STATE ===================== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");

  const orderStatusOptions = [
    "CREATED",
    "CONFIRMED",
    "PAID",
    "CANCELLED",
    "DELIVERED"
  ];

  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  /* ===================== LOAD ORDERS ===================== */
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    fetchOrders()
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  /* ===================== CREATE ORDER ===================== */
  const handleCreateOrder = () => {
    const orderRequest = {
      userId: Number(userId),
      status,
      totalPrice: Number(totalPrice)
    };

    createOrder(orderRequest)
      .then(() => {
        loadOrders();
        setView("list");
        setUserId("");
        setStatus("");
        setTotalPrice("");
      })
      .catch(err => console.error("Create error:", err));
  };

  /* ===================== UI ===================== */
  if (loading) return <p style={{ padding: 20 }}>Loading orders...</p>;

  return (
    <div style={{ padding: 30, background: "#f5f0ff", minHeight: "100vh" }}>
      {view === "list" && (
        <div style={{ maxWidth: 700, margin: "auto" }}>
          <h2 style={{ color: "#5b2d8b" }}>Orders</h2>

          <button
            style={{ marginBottom: 20 }}
            onClick={() => setView("create")}
          >
            + Create Order
          </button>

          {orders.map(order => (
            <div key={order.id} style={{ border: "1px solid #ccc", padding: 15, marginBottom: 10 }}>
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>User ID:</strong> {order.userId}</p>

              <select
                value={order.status}
                onChange={e =>
                  updateOrder(order.id, {
                    ...order,
                    status: e.target.value
                  }).then(loadOrders)
                }
              >
                {orderStatusOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <p><strong>Total:</strong> ${order.totalPrice}</p>

              <button
                style={{ marginTop: 10 }}
                onClick={() => deleteOrder(order.id).then(loadOrders)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {view === "create" && (
        <div style={{ maxWidth: 400, margin: "auto" }}>
          <h2>Create Order</h2>

          <input
            placeholder="User ID"
            type="number"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {orderStatusOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <input
            placeholder="Total Price"
            type="number"
            value={totalPrice}
            onChange={e => setTotalPrice(e.target.value)}
          />

          <button onClick={handleCreateOrder}>
            Save
          </button>

          <button onClick={() => setView("list")}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderList;
