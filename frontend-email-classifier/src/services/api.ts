import axios, { type AxiosInstance } from "axios";

// Url de conexão com API
const API_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
    baseURL: API_URL
});

export default api;