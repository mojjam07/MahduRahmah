import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import api from "./services/api";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import AdminDashboard from "./pages/AdminDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Unauthorized from "./pages/Unauthorized";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/Navbar.css";
import "./styles/Footer.css";

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Fetch initial data based on user role
          if (user.role === 'admin') {
            await api.get('/users/');
            await api.get('/announcements/');
          } else if (user.role === 'tutor') {
            await api.get('/courses/');
          } else if (user.role === 'student') {
            await api.get('/announcements/');
          }
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [user, loading]);

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/tutor" element={
          <ProtectedRoute requiredRole="tutor">
            <TutorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student" element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/announcements" element={
          <ProtectedRoute requiredRole="admin">
            <Announcements />
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute requiredRole="tutor">
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/students" element={
          <ProtectedRoute requiredRole="admin">
            <Students />
          </ProtectedRoute>
        } />
        <Route path="/add-student" element={
          <ProtectedRoute requiredRole="admin">
            <AddStudent />
          </ProtectedRoute>
        } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
