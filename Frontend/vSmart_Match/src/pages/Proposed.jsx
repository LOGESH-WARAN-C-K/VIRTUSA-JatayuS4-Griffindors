import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Proposed.css";

function Proposed() {
  const [proposed, setProposed] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/proposed", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProposed(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/proposed/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProposed((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const downloadCSV = () => {
    if (proposed.length === 0) return;

    const headers = [
      "S.No",
      "Job Title",
      "Name",
      "Email",
      "Phone",
      "Skills Matched",
      "Skill Gap",
      "Category",
      "Score",
    ];

    const rows = proposed.map((r, i) => [
      i + 1,
      r.jobTitle,
      r.name,
      r.email,
      r.phone,
      r.skillsMatched.join(", "),
      r.skillGap.join(", "),
      r.category || "N/A",
      r.score,
    ]);

    const csvContent =
      [headers, ...rows].map((row) =>
        row.map((cell) => `"${cell}"`).join(",")
      ).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "proposed_resumes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="proposed-page">
      <div className="proposed-header">
        <h2>Proposed Resumes</h2>
        <button className="csv-btn" onClick={downloadCSV}>Download CSV</button>
      </div>

      <table className="proposed-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Job Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills Matched</th>
            <th>Skill Gap</th>
            <th>Category</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {proposed.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.jobTitle}</td>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.skillsMatched.join(", ")}</td>
              <td>{r.skillGap.join(", ")}</td>
              <td>{r.category || "N/A"}</td>
              <td>{r.score}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Proposed;
