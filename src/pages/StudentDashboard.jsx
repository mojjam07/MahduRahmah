import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function StudentDashboard() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="dashboard">
        <h1>Student Dashboard</h1>
        <div className="dashboard-content">
          <p>Welcome, Student! View your courses and announcements here.</p>
          <div className="dashboard-links">
            <a href="/courses">My Courses</a>
            <a href="/announcements">Announcements</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
