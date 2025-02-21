import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !grade) {
      alert("Please fill in all fields.");
      return;
    }

    // In a real application, you would send this data to an API
    console.log("Student Name:", name);
    console.log("Student Grade:", grade);

    // Reset form fields
    setName("");
    setGrade("");

    // Redirect to the students page after submission
    navigate("/students");
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="grade">Grade:</label>
        <input
          type="number"
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
