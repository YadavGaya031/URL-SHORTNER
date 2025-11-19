import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://linkly-td22.onrender.com", 
  withCredentials: true,           
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // tum login ke baad token store karte ho
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized / Token expired");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
