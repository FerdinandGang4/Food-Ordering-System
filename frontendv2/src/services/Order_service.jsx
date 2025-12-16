
import axios from "axios";

const Order_API = import.meta.env.VITE_Order_API_URL;

export const fetchOrders = () => axios.get(Order_API);
export const createOrder = (order) => axios.post(Order_API, order);
export const updateOrder = (id, order) => axios.put(`${Order_API}/${id}`, order);
export const deleteOrder = (id) => axios.delete(`${Order_API}/${id}`);
