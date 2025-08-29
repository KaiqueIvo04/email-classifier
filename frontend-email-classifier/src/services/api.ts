import axios, { type AxiosInstance } from "axios";

// Url de conexão com API
const API_URL = 'http://localhost:8000';

const api: AxiosInstance = axios.create({
    baseURL: API_URL
});

export default api;