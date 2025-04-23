import React, { useState } from "react";
import "../styles/Navbar.css";
import "../styles/NavbarResponsive.css";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/react.svg";

function Navbar({ openLoginModal, openSignupModal }) {
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false);

  const translations = {
    en: {
      announcements: "Announcements",
      students: "Students",
      courses: "Courses",
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      signup: "Sign Up",
    },
    ar: {
      announcements: "إعلانات",
      students: "الطلاب",
      courses: "الدورات",
      profile: "الملف الشخصي",
      logout: "تسجيل خروج",
      login: "تسجيل دخول",
      signup: "تسجيل",
    },
  };

  const toggleMenu = () => {
    const navbarLinks = document.querySelector(".navbar-links");
    navbarLinks.classList.toggle("active");
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <button className="mobile-menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <div className="navbar-brand">
        <a href="/">
          <img src={logo} alt="Mahdu Rahmah Logo" className="navbar-logo" />
        </a>
      </div>
      <div className="navbar-links">
        {user && (
          <>
            {user.role === "admin" && (
              <>
                <a href="/announcements">Announcements</a>
                <a href="/students">Students</a>
              </>
            )}
            {user.role === "tutor" && <a href="/courses">Courses</a>}
            {user.role === "student" && (
              <a href="/announcements">Announcements</a>
            )}
            <div className="profile-dropdown">
              <button
                className="profile-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
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
                  <a href="/profile">Profile</a>
                  <a href="/logout">Logout</a>
                </div>
              )}
            </div>
          </>
        )}
        <div className="language-switcher">
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="language-button"
          >
            {language === "en" ? "العربية" : "English"}
          </button>
        </div>
        {user ? (
          <>
            <button className="logout-button" onClick={() => logout()}>
              {translations[language].logout}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="login-button"
              onClick={() => {
                console.log("Login button clicked");
                openLoginModal(true);
              }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff", padding: "4px 8px", marginRight: "10px" }}
            >
              {translations[language].login}
            </button>
            <button
              type="button"
              className="signup-button"
              onClick={() => {
                console.log("Signup button clicked");
                openSignupModal(true);
              }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff", padding: "4px 8px" }}
            >
              {translations[language].signup}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
