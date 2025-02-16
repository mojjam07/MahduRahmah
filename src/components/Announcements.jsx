import React, { useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome Back!",
      content: "Welcome back to a new semester!",
    },
    {
      id: 2,
      title: "Important Dates",
      content: "Please note the upcoming deadlines.",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnnouncements([
      ...announcements,
      { ...newAnnouncement, id: announcements.length + 1 },
    ]);
    setNewAnnouncement({ title: "", content: "" });
  };

  return (
    <div>
      <h2>Announcements</h2>
      {announcements.map((announcement) => (
        <div key={announcement.id} className="announcement">
          <h4>{announcement.title}</h4>
          <p>{announcement.content}</p>
        </div>
      ))}

      <h3>Add New Announcement</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newAnnouncement.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={newAnnouncement.content}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Announcement</button>
      </form>
    </div>
  );
}

export default Announcements;
