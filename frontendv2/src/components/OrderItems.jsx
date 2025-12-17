
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
  const [items, setItems] = useState([
    { productId: "", quantity: "", price: "" }
  ]);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: ""
  });

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: ""
  });


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
      userId: parseInt(userId),
      status,
      totalPrice: parseFloat(totalPrice),
      items: items.map(i => ({
        productId: parseInt(i.productId),
        quantity: parseInt(i.quantity),
        price: parseFloat(i.price)
      })),
      shippingAddress,
      billingAddress
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

         {orders.map((order) => (
  <div key={order.id} style={styles.orderCard}>
    {/* Header */}
    <div style={{ marginBottom: "10px" }}>
      <h3 style={{ margin: 0, color: "#5b2d8b" }}>
        Order #{order.id}
      </h3>
      <small style={{ color: "#777" }}>
        User ID: {order.userId}
      </small>
    </div>

    {/* Body */}
    <div style={{ marginBottom: "12px" }}>
      <p style={{ margin: "6px 0" }}>
        <strong>Customer:</strong> {order.customerName}
      </p>

      <p style={{ margin: "6px 0" }}>
        <strong>Total:</strong>{" "}
        <span style={{ fontWeight: "bold", color: "#333" }}>
          ${order.totalPrice}
        </span>
      </p>
    </div>

    {/* Actions */}
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button
        style={styles.buttonSecondary}
        onClick={() => deleteOrder(order.id).then(loadOrders)}
      >
        Delete Order
      </button>
    </div>
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
        
            {/* Order Info */}
          <div style={styles.section}>
            <label style={styles.label}>User ID</label>
            <input
              style={styles.input}
              type="number"
              placeholder="Enter user ID"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />

            <label style={styles.label}>Order Status</label>
            <select
              style={styles.input}
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              {orderStatusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Items */}
          <div style={styles.section}>
            <h3 style={styles.title}>Order Items</h3>

            {items.map((item, index) => (
              <div key={index} style={styles.itemCard}>
                <div style={styles.row}>
                  <input
                    style={styles.input}
                    placeholder="Product ID"
                    type="number"
                    value={item.productId}
                    onChange={e => {
                      const newItems = [...items];
                      newItems[index].productId = e.target.value;
                      setItems(newItems);
                    }}
                  />
                  <input
                    style={styles.input}
                    placeholder="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={e => {
                      const newItems = [...items];
                      newItems[index].quantity = e.target.value;
                      setItems(newItems);
                    }}
                  />
                  <input
                    style={styles.input}
                    placeholder="Price"
                    type="number"
                    value={item.price}
                    onChange={e => {
                      const newItems = [...items];
                      newItems[index].price = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              style={styles.buttonSecondary}
              onClick={() =>
                setItems([...items, { productId: "", quantity: "", price: "" }])
              }
            >
              + Add Item
            </button>
          </div>

          {/* Shipping Address */}
          <div style={styles.section}>
            <h3 style={styles.title}>Shipping Address</h3>
            <input style={styles.input} placeholder="Street"
              value={shippingAddress.street}
              onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })} />
            <input style={styles.input} placeholder="City"
              value={shippingAddress.city}
              onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
            <input style={styles.input} placeholder="State"
              value={shippingAddress.state}
              onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
            <input style={styles.input} placeholder="ZIP Code"
              value={shippingAddress.zip}
              onChange={e => setShippingAddress({ ...shippingAddress, zip: e.target.value })} />
          </div>

          {/* Billing Address */}
          <div style={styles.section}>
            <h3 style={styles.title}>Billing Address</h3>
            <input style={styles.input} placeholder="Street"
              value={billingAddress.street}
              onChange={e => setBillingAddress({ ...billingAddress, street: e.target.value })} />
            <input style={styles.input} placeholder="City"
              value={billingAddress.city}
              onChange={e => setBillingAddress({ ...billingAddress, city: e.target.value })} />
            <input style={styles.input} placeholder="State"
              value={billingAddress.state}
              onChange={e => setBillingAddress({ ...billingAddress, state: e.target.value })} />
            <input style={styles.input} placeholder="ZIP Code"
              value={billingAddress.zip}
              onChange={e => setBillingAddress({ ...billingAddress, zip: e.target.value })} />
          </div>

          <label style={styles.label}>Total Price</label>
            <input
              style={styles.input}
              type="number"
              placeholder="Total amount"
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
