import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Announcements from "./components/Announcements";
import Courses from "./components/Courses";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/students">Students</Link>
        <Logout />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </div>
  );
}

export default App;
