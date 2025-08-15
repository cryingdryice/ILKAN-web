import axios from "axios";
import { useStore } from "../store/store";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const role = localStorage.getItem("role");
    if (role) {
      config.headers["X-Role"] = role;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
