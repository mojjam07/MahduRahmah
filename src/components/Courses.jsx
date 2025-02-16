import React, { useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics", description: "Introduction to Mathematics" },
    { id: 2, name: "History", description: "World History Overview" },
  ]);

  const [newCourse, setNewCourse] = useState({ name: "", description: "" });

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setNewCourse({ name: "", description: "" });
  };

  return (
    <div>
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Course</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newCourse.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default Courses;
