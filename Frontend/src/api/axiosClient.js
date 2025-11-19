import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000" || "https://linkly-td22.onrender.com", 
  withCredentials: true,           
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
