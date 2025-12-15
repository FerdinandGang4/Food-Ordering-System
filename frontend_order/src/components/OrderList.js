import React, { useState, useEffect } from "react";
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder
} from "../services/orderService";

function OrderList() {
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

  // ===== Create Order State (EMPTY) =====
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const [items, setItems] = useState([
    { productId: "", quantity: "", price: "" }
  ]);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    zip: ""
  });

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    zip: ""
  });

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

  // ===== Load Orders =====
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
        console.error(err);
        setLoading(false);
      });
  };

  // ===== Create Order =====
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
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p style={{ padding: 20 }}>Loading orders...</p>;

  return (
    <div style={styles.page}>
      {view === "list" && (
        <div style={styles.card}>
          <h2 style={styles.title}>All Orders</h2>

          <button
            style={styles.buttonPrimary}
            onClick={() => setView("create")}
          >
            + Create New Order
          </button>

          {orders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <h3>Order #{order.id}</h3>

              <p><strong>Customer:</strong> {order.customerName}</p>

              <p>
                <strong>Status:</strong>{" "}
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
              </p>

              <p><strong>Total:</strong> ${order.totalPrice}</p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

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
          <h2 style={styles.title}>Create New Order</h2>

          <button
            style={styles.buttonSecondary}
            onClick={() => setView("list")}
          >
            ← Back to Orders
          </button>

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

            <label style={styles.label}>Total Price</label>
            <input
              style={styles.input}
              type="number"
              placeholder="Total amount"
              value={totalPrice}
              onChange={e => setTotalPrice(e.target.value)}
            />
          </div>

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
                    placeholder="Qty"
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

          <div style={styles.section}>
            <h3 style={styles.title}>Shipping Address</h3>
            <input
              style={styles.input}
              placeholder="Street"
              value={shippingAddress.street}
              onChange={e =>
                setShippingAddress({ ...shippingAddress, street: e.target.value })
              }
            />
            <input
              style={styles.input}
              placeholder="City"
              value={shippingAddress.city}
              onChange={e =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
            />
            <input
              style={styles.input}
              placeholder="ZIP"
              value={shippingAddress.zip}
              onChange={e =>
                setShippingAddress({ ...shippingAddress, zip: e.target.value })
              }
            />
          </div>

          <div style={styles.section}>
            <h3 style={styles.title}>Billing Address</h3>
            <input
              style={styles.input}
              placeholder="Street"
              value={billingAddress.street}
              onChange={e =>
                setBillingAddress({ ...billingAddress, street: e.target.value })
              }
            />
            <input
              style={styles.input}
              placeholder="City"
              value={billingAddress.city}
              onChange={e =>
                setBillingAddress({ ...billingAddress, city: e.target.value })
              }
            />
            <input
              style={styles.input}
              placeholder="ZIP"
              value={billingAddress.zip}
              onChange={e =>
                setBillingAddress({ ...billingAddress, zip: e.target.value })
              }
            />
          </div>

          <button style={styles.buttonPrimary} onClick={handleCreateOrder}>
            Create Order
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderList;
