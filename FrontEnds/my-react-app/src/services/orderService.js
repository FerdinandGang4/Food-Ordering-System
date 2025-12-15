import axios from "axios";

const API_URL = "http://localhost:9090/orders";

export const fetchOrders = () => axios.get(API_URL);
export const createOrder = (order) => axios.post(API_URL, order);
export const updateOrder = (id, order) => axios.put(`${API_URL}/${id}`, order);
export const deleteOrder = (id) => axios.delete(`${API_URL}/${id}`);
