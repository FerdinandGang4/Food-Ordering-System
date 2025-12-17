import axios from "axios";

const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;


export const submitPayment = (payload) => axios.post(PAYMENT_API_URL, payload);

export default submitPayment;
