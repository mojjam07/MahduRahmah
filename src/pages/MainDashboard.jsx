import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "./Login";
import Register from "./Register";
import "../styles/Modal.css";

function MainDashboard() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <div className="page-container">
      <Navbar
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
      />
      <div
        className="dashboard"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            textAlign: "center",
            flexGrow: 1,
            color: "white",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          >
            <source src="./src/assets/demo-video.mp4" type="video/mp4" />
          </video>
          <h1>Rahmat El-Islaamiy Institute</h1>
          <h3 style={{ marginBottom: "5px" }}>
            Your gateway to education and resources
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "20px",
            padding: "20px",
          }}
        >
          <div
            className="dashboard-item"
            style={{
              flex: "1 0 300px",
              maxWidth: "400px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Announcements</h3>
            <p>Check the latest school announcements.</p>
            <a href="/announcements">View Announcements</a>
          </div>
          <div
            className="dashboard-item"
            style={{
              flex: "1 0 300px",
              maxWidth: "400px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Courses</h3>
            <p>See the available courses and enroll.</p>
            <a href="/courses">View Courses</a>
          </div>
          <div
            className="dashboard-item"
            style={{
              flex: "1 0 300px",
              maxWidth: "400px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Students</h3>
            <p>Manage student information.</p>
            <a href="/students">View Students</a>
          </div>
        </div>
      </div>
      <Footer />

      {(showLoginModal || showSignupModal) && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {showLoginModal && <Login />}
            {showSignupModal && <Register />}
            <button className="modal-close-button" onClick={closeModals}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainDashboard;
