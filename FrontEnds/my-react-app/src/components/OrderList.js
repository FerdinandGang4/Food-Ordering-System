import React, { useState, useEffect } from "react";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "../services/orderService";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'list' or 'create'

  // Pre-fill form with sample JSON values
  const [userId, setUserId] = useState(45);
  const [status, setStatus] = useState("CREATED");
  const [totalPrice, setTotalPrice] = useState(120.50);
  const [items, setItems] = useState([
    { productId: 106, quantity: 2, price: 25.50 },
    { productId: 99, quantity: 1, price: 66.50 }
  ]);
  const [shippingAddress, setShippingAddress] = useState({
    street: "123 Main St",
    city: "New Cameroon",
    zip: "10001"
  });
  const [billingAddress, setBillingAddress] = useState({
    street: "456 Elm St",
    city: "New York",
    zip: "10002"
  });

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
        setView("list"); // Back to orders list
      })
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
                  onChange={(e) => {
                    const updatedStatus = e.target.value;
                    updateOrder(order.id, { ...order, status: updatedStatus }).then(loadOrders);
                  }}
                >
                  {orderStatusOptions.map((s, index) => (
                    <option key={index} value={s}>{s}</option>
                  ))}
                </select>
              </p>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <button onClick={() => deleteOrder(order.id).then(loadOrders)}>Delete</button>
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
            type="number"
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

          <h3>Items</h3>
          {items.map((item, index) => (
            <div key={index}>
              <input
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
          ))}

          <h3>Shipping Address</h3>
          <input
            placeholder="Street"
            value={shippingAddress.street}
            onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
          />
          <input
            placeholder="City"
            value={shippingAddress.city}
            onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
          />
          <input
            placeholder="ZIP"
            value={shippingAddress.zip}
            onChange={e => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
          />

          <h3>Billing Address</h3>
          <input
            placeholder="Street"
            value={billingAddress.street}
            onChange={e => setBillingAddress({ ...billingAddress, street: e.target.value })}
          />
          <input
            placeholder="City"
            value={billingAddress.city}
            onChange={e => setBillingAddress({ ...billingAddress, city: e.target.value })}
          />
          <input
            placeholder="ZIP"
            value={billingAddress.zip}
            onChange={e => setBillingAddress({ ...billingAddress, zip: e.target.value })}
          />

          <button onClick={handleCreateOrder}>Create Order</button>
        </div>
      )}
    </div>
  );
}

export default OrderList;
