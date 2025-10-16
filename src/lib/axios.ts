import axios from 'axios';
import { toast } from 'react-toastify';

// Remove /api from baseURL since routes already include it
const API_URL = process.env.NEXT_PUBLIC_APP_URI || 'http://localhost:4005';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || 'Session expired. Please login again.';
      
      // Show toast notification
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
      });

      // Redirect to admin login page after a short delay
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/admin';
        }
      }, 1500);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
