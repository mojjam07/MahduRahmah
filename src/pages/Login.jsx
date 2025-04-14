import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to student role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const demoUsers = {
  admin: { username: 'admin', password: 'admin123', role: 'Admin' },
  tutor: { username: 'tutor', password: 'tutor123', role: 'Tutor' },
  student: { username: 'student', password: 'student123', role: 'Student' },
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  // Check for demo login
  const demoUser = demoUsers[role];
  if (username === demoUser.username && password === demoUser.password) {
    // Simulate successful login
    navigate(`/${demoUser.role.toLowerCase()}-dashboard`);
    setLoading(false);
    return;
  }
    
    try {
      const response = await login({ username, password });
      if (response) {
        const userRole = response.role; // Assuming the response contains the user's role
        navigate(`/${userRole.toLowerCase()}-dashboard`); // Redirect based on role

      }
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="form-control"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            placeholder={`Try "${role}" for demo`}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder={`Try "${role}123" for demo`}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
