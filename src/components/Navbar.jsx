import React, { useState } from "react";
import "../styles/Navbar.css";
import "../styles/NavbarResponsive.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/react.svg";

function Navbar() {
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
        <Link to="/">
          <img src={logo} alt="Mahdu Rahmah Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-links">
        {user && (
          <>
            {user.role === "admin" && (
              <>
                <Link to="/announcements">Announcements</Link>
                <Link to="/students">Students</Link>
              </>
            )}
            {user.role === "tutor" && <Link to="/courses">Courses</Link>}
            {user.role === "student" && (
              <Link to="/announcements">Announcements</Link>
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
                  <Link to="/profile">Profile</Link>
                  <Link to="/logout">Logout</Link>
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
            <Link to="/login" className="login-button">
              {translations[language].login}
            </Link>
            <Link to="/register" className="signup-button">
              {translations[language].signup}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
