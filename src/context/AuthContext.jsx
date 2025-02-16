import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (role, credentials) => {
    // TODO: Implement actual authentication
    const userData = {
      role,
      name: credentials.username,
      token: 'dummy-token'
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (requiredRole) => {
    return user?.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
