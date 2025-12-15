import React, { useState, useEffect } from "react";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "../services/orderService";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'list' or 'create'

  // Form state
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: "", price: "" }]);
  const [shippingAddress, setShippingAddress] = useState({ street: "", city: "", zip: "" });
  const [billingAddress, setBillingAddress] = useState({ street: "", city: "", zip: "" });

  const orderStatusOptions = ["CREATED", "CONFIRMED", "PAID", "CANCELLED", "DELIVERED"];

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
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  };

  const handleCreateOrder = () => {
    const orderRequest = {
      userId: parseInt(userId),
      status,
      totalPrice: parseFloat(totalPrice),
      items: items.map(i => ({
        productId: parseInt(i.productId),
        quantity: parseInt(i.quantity),
        price: parseFloat(i.price),
      })),
      shippingAddress,
      billingAddress,
    };

    createOrder(orderRequest)
      .then(() => {
        loadOrders();
        setView("list"); // Back to order list
        // Reset form
        setUserId("");
        setStatus("");
        setTotalPrice("");
        setItems([{ productId: "", quantity: "", price: "" }]);
        setShippingAddress({ street: "", city: "", zip: "" });
        setBillingAddress({ street: "", city: "", zip: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    deleteOrder(id)
      .then(() => loadOrders())
      .catch(err => console.error(err));
  };

  const handleUpdate = (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    const updatedOrder = { ...order, status: newStatus };
    updateOrder(orderId, updatedOrder)
      .then(() => loadOrders())
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      {view === "list" && (
        <div>
          <h2>All Orders</h2>
          <button onClick={() => setView("create")}>Create New Order</button>

          {orders.map(order => (
            <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>Orders #{order.id}</h3>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p>
                <strong>Status:</strong>{" "}
                <select
                  value={order.status}
                  onChange={(e) => handleUpdate(order.id, e.target.value)}
                >
                  {orderStatusOptions.map((s, index) => (
                    <option key={index} value={s}>{s}</option>
                  ))}
                </select>
              </p>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <button onClick={() => handleDelete(order.id)} style={{ marginRight: "10px" }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {view === "create" && (
        <div>
          <h2>Create New Order</h2>
          <button onClick={() => setView("list")}>Back to Orders</button>

          <input
            placeholder="User ID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />

          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            {orderStatusOptions.map((s, index) => (
              <option key={index} value={s}>{s}</option>
            ))}
          </select>

          <input
            placeholder="Total Price"
            type="number"
            value={totalPrice}
            onChange={e => setTotalPrice(e.target.value)}
          />

          {/* Items, shippingAddress, billingAddress inputs */}
          <button onClick={handleCreateOrder}>Create Order</button>
        </div>
      )}
    </div>
  );
}

export default OrderList;
