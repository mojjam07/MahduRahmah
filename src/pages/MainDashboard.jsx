import React from 'react';
import { Link } from 'react-router-dom';

function MainDashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to School Management System</h1>
      <div className="dashboard-links">
        <Link to="/login" className="dashboard-link">
          Login
        </Link>
        <Link to="/register" className="dashboard-link">
          Register
        </Link>
      </div>
    </div>
  );
}

export default MainDashboard;
