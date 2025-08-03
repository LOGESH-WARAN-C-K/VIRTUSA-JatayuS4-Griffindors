import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
    setFormData(user);
  };

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  const inputStyle = {
    padding: "10px 12px",
    border: "1px solid #d1fae5",
    borderRadius: "8px",
    fontSize: "15px",
    backgroundColor: "#ecfdf5",
    transition: "border 0.2s, background-color 0.2s",
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h2>{user.name}</h2>
        </div>
        <div className="profile-info">
          <div className="profile-row">
            <label className="profile-label">Name:</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <span className="profile-value">{user.name}</span>
            )}
          </div>
          <div className="profile-row">
            <label className="profile-label">Email:</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <span className="profile-value">{user.email}</span>
            )}
          </div>
        </div>
        {editMode ? (
          <>
            <button className="profile-edit-btn" onClick={handleSave}>
              Save
            </button>
            <button
              className="profile-edit-btn"
              onClick={handleEditToggle}
              style={{ backgroundColor: "#e3342f" }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="profile-edit-btn" onClick={handleEditToggle}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
