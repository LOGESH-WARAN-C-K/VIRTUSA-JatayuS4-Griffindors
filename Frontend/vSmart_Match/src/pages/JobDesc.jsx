import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./JobDesc.css";

function JobDesc() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [requirementCount, setRequirementCount] = useState("");
  const [demands, setDemands] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch job descriptions for logged-in user
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/jobdesc", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDemands(res.data))
      .catch((err) => {
        console.error("Error fetching:", err);
        if (err.response?.status === 401) {
          alert("Session expired or unauthorized. Please login again.");
        }
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { jobTitle, jobDesc, requirementCount };

    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:5000/api/jobdesc/${editId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDemands((prev) =>
          prev.map((item) => (item._id === editId ? res.data : item))
        );
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/jobdesc", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDemands([res.data, ...demands]);
      }

      setJobTitle("");
      setJobDesc("");
      setRequirementCount("");
    } catch (err) {
      console.error("Save error:", err);
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login again.");
      } else {
        alert("Failed to save. Check console.");
      }
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setJobTitle(item.jobTitle);
    setJobDesc(item.jobDesc);
    setRequirementCount(item.requirementCount);
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/jobdesc/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setDemands((prev) => prev.filter((item) => item._id !== id));
  } catch (err) {
    console.error("❌ Delete error:", err);
    alert("Failed to delete. Check console.");
  }
};

  return (
    <div className="demand-container">
      <h2 className="title">Job Description </h2>

      <form onSubmit={handleSubmit} className="demand-form">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />

        <Editor
          apiKey="ep34zhi8efjo4u0d1ak799ha93gm2jrpjoh5uvzc4m9s36vg"
          value={jobDesc}
          onEditorChange={(content) => setJobDesc(content)}
          init={{
            height: 250,
            menubar: false,
            branding: false,
            statusbar: false,
            placeholder: "Enter job description here...",
            plugins: [
              "advlist", "autolink", "lists", "link", "preview", "anchor",
              "searchreplace", "visualblocks", "code", "fullscreen",
              "insertdatetime", "media", "table", "help", "wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link | help"
          }}
        />

        <input
          type="number"
          className="require"
          placeholder="Number of Requirements"
          value={requirementCount}
          onChange={(e) => setRequirementCount(e.target.value)}
          required
        />

        <button type="submit" className="add-btn">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="demand-list">
        {demands.map((d) => (
          <li key={d._id} className="demand-item">
            <div className="card">
              <h3>{d.jobTitle}</h3>
              <div
                className="job-desc-preview"
                dangerouslySetInnerHTML={{ __html: d.jobDesc }}
              />
              <div className="requirement">
                <p>No. of Requirements: <strong>{d.requirementCount}</strong></p>
              </div>
              <div className="demand-actions">
                <button className="edit-btn" onClick={() => handleEdit(d)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(d._id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobDesc;
