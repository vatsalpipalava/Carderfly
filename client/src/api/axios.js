import axios from "axios";

// const BASE_URL = "http://192.168.1.13:8080/api/v1";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
