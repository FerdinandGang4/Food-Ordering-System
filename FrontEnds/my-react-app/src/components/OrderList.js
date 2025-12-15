import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";


function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    ApiService.getOrders()
    .then((data) => setOrders(data))
    .catch((err) => console.error("Failed to load orders", err))
    .finally(() => setLoading(false));
    }, []);


if (loading) return <p>Loading orders...</p>;


return (
    <div style={{ padding: "20px" }}>
    <h2> Current Orders</h2>


    {orders.map((order) => (
    <div
    key={order.id}
    style={{
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
}}
    >
    <h3>Orders #{order.id}</h3>
    <p><strong>Customer:</strong> {order.customerName}</p>
    <p><strong>Status:</strong> {order.status}</p>
    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
    <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

{/* Items */}
<h4>Items</h4>
{order.items && order.items.length > 0 ? (
<table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
<thead>
<tr>
  <th>Product ID</th>
  <th>Product Name</th>
  <th>Quantity</th>
  <th>Price</th>
</tr>
</thead>
<tbody>
{order.items.map((item, index) => (
  <tr key={index}>
    <td>{item.productId}</td>
    <td>{item.productName || "N/A"}</td>
    <td>{item.quantity}</td>
    <td>${item.price}</td>
  </tr>
))}
</tbody>
</table>
) : (
<p>No items in this order</p>
)}


{/* Shipping Address */}
<h4>Shipping Address</h4>
{order.shippingAddress ? (
<p>
{order.shippingAddress.street}, {order.shippingAddress.city},
{" "}{order.shippingAddress.state} {order.shippingAddress.zipCode}
</p>
) : (
<p>Not provided</p>
)}


{/* Billing Address */}
<h4>Billing Address</h4>
{order.billingAddress ? (
<p>
{order.billingAddress.street}, {order.billingAddress.city},
{" "}{order.billingAddress.state} {order.billingAddress.zipCode}
</p>
) : (
<p>Not provided</p>
)}
</div>
))}
</div>
);
}


export default OrderList;