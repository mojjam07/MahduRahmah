import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';


function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="profile-section">
        {user.profile_picture ? (
          <img 
            src={user.profile_picture} 
            alt="Profile" 
            className="profile-picture"
          />
        ) : (
          <div className="profile-placeholder">
            <span className="profile-initial">{user.username[0]}</span>
          </div>
        )}
        <div className="profile-info">
          <h3>{user.username}</h3>
          <p>({user.role})</p>
        </div>
      </div>
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <p>Welcome, Admin! You have full access to manage the system.</p>
        <div className="dashboard-links">
          <a href="/students">Manage Students</a>
          <a href="/courses">Manage Courses</a>
          <a href="/announcements">Manage Announcements</a>
        </div>
      </div>
    </div>

  );
}

export default AdminDashboard;
