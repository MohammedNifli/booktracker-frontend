import axios from "axios";

const domain = import.meta.env.VITE_DOMAIN;

const axiosClient = axios.create({
  baseURL: domain ?? 'http://localhost:3000',
});

export default axiosClient;