import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-item">
          <h3>Announcements</h3>
          <p>Check the latest school announcements.</p>
          <a href="/announcements">View Announcements</a>
        </div>
        <div className="dashboard-item">
          <h3>Courses</h3>
          <p>See the available courses and enroll.</p>
          <a href="/courses">View Courses</a>
        </div>
        <div className="dashboard-item">
          <h3>Students</h3>
          <p>Manage student information.</p>
          <a href="/students">View Students</a>
        </div>
        <div className="dashboard-item">
          <h3>Login</h3>
          <Link to="/login">Login</Link>
        </div>
        <div className="dashboard-item">
          <h3>Register</h3>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
