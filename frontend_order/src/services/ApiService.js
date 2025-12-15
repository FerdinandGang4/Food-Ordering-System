import axios from "axios";

export default class ApiService {
static BASE_URL = "http://localhost:9090";


/* =====================
TOKEN & ROLE STORAGE
===================== */


static saveToken(token) {
localStorage.setItem("token", token);
}


static getToken() {
return localStorage.getItem("token");
}


static saveRole(roles) {
localStorage.setItem("roles", JSON.stringify(roles));
}


static getRole() {
const roles = localStorage.getItem("roles");
return roles ? JSON.parse(roles) : null;
}


static clearAuth() {
localStorage.removeItem("token");
localStorage.removeItem("roles");
}


/* =====================
AXIOS CONFIGURATION
===================== */


static axiosInstance = axios.create({
baseURL: ApiService.BASE_URL,
headers: {
"Content-Type": "application/json",
},
});


// Attach token automatically to every request
static initAuthInterceptor() {
ApiService.axiosInstance.interceptors.request.use(
(config) => {
const token = ApiService.getToken();
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
(error) => Promise.reject(error)
);
}


/* =====================
AUTH APIs
===================== */


static async login(credentials) {
const response = await ApiService.axiosInstance.post("/auth/login", credentials);
const { token, roles } = response.data;


ApiService.saveToken(token);
ApiService.saveRole(roles);


return response.data;
}


static async logout() {
ApiService.clearAuth();
}


/* =====================
ORDER APIs
===================== */


static async getOrders() {
const response = await ApiService.axiosInstance.get("/orders");
return response.data;
}


static async getOrderById(orderId) {
const response = await ApiService.axiosInstance.get(`/orders/${orderId}`);
return response.data;
}


static async createOrder(order) {
const response = await ApiService.axiosInstance.post("/orders", order);
return response.data;
}


/* =====================
CART APIs
===================== */


static async getCart() {
const response = await ApiService.axiosInstance.get("/cart");
return response.data;
}


static async addToCart(item) {
const response = await ApiService.axiosInstance.post("/cart/add", item);
return response.data;
}


static async removeFromCart(itemId) {
const response = await ApiService.axiosInstance.delete(`/cart/remove/${itemId}`);
return response.data;
}
}