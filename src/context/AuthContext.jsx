import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Token ${token}`;
          const response = await api.get('/users/me/');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = useCallback(async (userData) => {
    try {
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('token', userData.token);
      api.defaults.headers.common['Authorization'] = `Token ${userData.token}`;
      // Redirect to appropriate dashboard based on role
      if (userData.user.role === 'admin') {
        navigate('/admin');
      } else if (userData.user.role === 'tutor') {
        navigate('/tutor');
      } else if (userData.user.role === 'student') {
        navigate('/student');
      }

    } catch (error) {
      throw error;
    }
  }, [navigate]);



  const logout = useCallback(async () => {
    try {
      await api.post('/logout/');
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      navigate('/login'); // Redirect to login page after logout
    }
  }, [navigate]);


  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await api.put('/profile/', profileData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  }, []);



  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>


      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
