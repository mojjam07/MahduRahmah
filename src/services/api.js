import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle different HTTP status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 403:
          // Handle forbidden access
          window.location.href = "/unauthorized";
          break;
        case 404:
          // Handle not found errors
          return Promise.reject({ message: "Resource not found" });
        case 500:
          // Handle server errors
          return Promise.reject({ message: "Server error occurred" });
        default:
          return Promise.reject(error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: "Network error occurred" });
    } else {
      // Something happened in setting up the request
      return Promise.reject({ message: "Request setup error" });
    }
  }
);

// Authentication API
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    // Improved error handling
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("Network error occurred");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return response;
  } catch (error) {
    throw error;
  }
};

// Other API functions remain unchanged...

export default api;
