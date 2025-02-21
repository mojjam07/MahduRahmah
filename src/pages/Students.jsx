import React, { useState } from "react";
import { Link } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", grade: "12" },
    { id: 2, name: "Jane Smith", grade: "11" },
  ]);

  return (
    <div>
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-student">Add New Student</Link>
    </div>
  );
}

export default Students;
