import axios from "axios";

const RESTAURANT_API_URL = import.meta.env.VITE_RESTAURANT_API_URL;

export const fetchRestaurants = () => axios.get(RESTAURANT_API_URL);

export const fetchMenuByRestaurant = (restaurantId) => axios.get(`${RESTAURANT_API_URL}/${restaurantId}/menu`);

export const createMenuItem = (restaurantId, menuData) => axios.post(`${RESTAURANT_API_URL}/${restaurantId}/menu`, menuData);

export const updateMenuItem = (restaurantId, menuId, menuData) => axios.put(`${RESTAURANT_API_URL}/${restaurantId}/menu/${menuId}`, menuData);

export const deleteMenuItem = (restaurantId, menuId) => axios.delete(`${RESTAURANT_API_URL}/${restaurantId}/menu/${menuId}`);

export const fetchMenuItem = (restaurantId, menuId) => axios.get(`${RESTAURANT_API_URL}/${restaurantId}/menu/${menuId}`);