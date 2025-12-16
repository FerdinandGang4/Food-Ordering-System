
import React, { useEffect, useState } from "react";

// ===== Styles =====
  const styles = {
    page: {
      background: "#f5f0ff",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial, sans-serif"
    },
    card: {
      background: "#ffffff",
      maxWidth: "720px",
      margin: "auto",
      padding: "25px",
      borderRadius: "14px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)"
    },
    title: {
      color: "#5b2d8b",
      marginBottom: "18px"
    },
    section: {
      marginBottom: "22px"
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "6px",
      color: "#5b2d8b"
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc"
    },
    row: {
      display: "flex",
      gap: "10px"
    },
    buttonPrimary: {
      background: "#7b3fe4",
      color: "#fff",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      width: "100%"
    },
    buttonSecondary: {
      background: "#e6dbff",
      color: "#5b2d8b",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginBottom: "15px"
    },
    itemCard: {
      background: "#f3edff",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "10px"
    },
    orderCard: {
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px",
      background: "#fff"
    }
  };

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
        const ordersData = Array.isArray(res.data) ? res.data : res.data?.orders || [];
        setOrders(ordersData);
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
    <div style={styles.page}>
      {view === "list" && (
        <div style={styles.card}>
          <h2 style={{ color: "#5b2d8b" }}>Orders</h2>

          <button
           style={styles.buttonPrimary}
            onClick={() => setView("create")}
          >
            + Create Order
          </button>

          {orders.map(order => (
            <div key={order.id} style={styles.orderCard}>
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
                style={styles.buttonSecondary}
                onClick={() => deleteOrder(order.id).then(loadOrders)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {view === "create" && (
        <div style={styles.card}>
          <h2>Create Order</h2>
 <button
            style={styles.buttonSecondary}
            onClick={() => setView("list")}
          >
            ← Back to Orders
          </button>
          <input style={styles.input}
            placeholder="User ID"
            type="number"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />

          <select style={styles.input}
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

          <button onClick={handleCreateOrder} style={styles.buttonPrimary}>
            Save
          </button>

        </div>
      )}
    </div>
  );
}

export default OrderList;
