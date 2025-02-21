import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const { user, logout } = useAuth();


  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-brand">
        <Link to="/">Mahdu Rahmah</Link>
      </div>
      <div className="navbar-links">
        {user && (
          <>
            {user.role === 'admin' && (
              <>
                <Link to="/announcements">Announcements</Link>
                <Link to="/students">Students</Link>
              </>
            )}
            {user.role === 'tutor' && (
              <Link to="/courses">Courses</Link>
            )}
            {user.role === 'student' && (
              <Link to="/announcements">Announcements</Link>
            )}
            <div className="profile-dropdown">
              <button className="profile-button" onClick={() => setShowDropdown(!showDropdown)}>
                {user.profile_picture ? (
                  <img 
                    src={user.profile_picture} 
                    alt="Profile" 
                    className="profile-picture"
                  />
                ) : (
                  <span className="profile-initial">{user.username[0]}</span>
                )}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile">Profile</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              )}
            </div>
          </>
        )}
        {user ? (
          <button className="logout-button" onClick={() => logout()}>Logout</button>

        ) : (
          <Link to="/login">Login</Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
