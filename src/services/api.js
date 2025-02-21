import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor for handling errors
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    // Handle different HTTP status codes
    switch (error.response.status) {
      case 401:
        // Handle unauthorized access
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        break;
      case 403:
        // Handle forbidden access
        window.location.href = '/unauthorized';
        break;
      case 404:
        // Handle not found errors
        return Promise.reject({ message: 'Resource not found' });
      case 500:
        // Handle server errors
        return Promise.reject({ message: 'Server error occurred' });
      default:
        return Promise.reject(error.response.data);
    }
  } else if (error.request) {
    // The request was made but no response was received
    return Promise.reject({ message: 'Network error occurred' });
  } else {
    // Something happened in setting up the request
    return Promise.reject({ message: 'Request setup error' });
  }
});

// Authentication API
export const login = async (credentials) => {
  try {
    const response = await api.post('/login/', credentials);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register/', userData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout/');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    throw error;
  }
};

// User API
export const getUsers = async () => {
  try {
    const response = await api.get('/users/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/profile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.put('/profile/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Announcements API
export const getAnnouncements = async () => {
  try {
    const response = await api.get('/announcements/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAnnouncement = async (data) => {
  try {
    const response = await api.post('/announcements/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Courses API
export const getCourses = async () => {
  try {
    const response = await api.get('/courses/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (data) => {
  try {
    const response = await api.post('/courses/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Students API
export const getStudents = async () => {
  try {
    const response = await api.get('/students/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStudent = async (data) => {
  try {
    const response = await api.post('/students/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
