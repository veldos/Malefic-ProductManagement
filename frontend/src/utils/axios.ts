import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://malefic-productmanagement.onrender.com/api', // Replace with your backend API URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
