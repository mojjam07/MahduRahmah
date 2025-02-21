import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function TutorDashboard() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="dashboard">
        <h1>Tutor Dashboard</h1>
        <div className="dashboard-content">
          <p>Welcome, Tutor! You can manage your courses and view student progress.</p>
          <div className="dashboard-links">
            <a href="/courses">My Courses</a>
            <a href="/students">My Students</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TutorDashboard;
