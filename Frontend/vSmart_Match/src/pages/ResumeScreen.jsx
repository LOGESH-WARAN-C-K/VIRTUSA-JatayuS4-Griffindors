import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import "./ResumeScreen.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function ResumeScreen() {
  const [jobDescs, setJobDescs] = useState([]);
  const [selectedJD, setSelectedJD] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [parsedResumes, setParsedResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [topN, setTopN] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [radarSkills, setRadarSkills] = useState({});
  const [radarName, setRadarName] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobdesc", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobDescs(res.data))
      .catch((err) => console.error("JD Fetch Error:", err));

    axios
      .get("http://localhost:5000/api/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.score - a.score);
        setParsedResumes(sorted);
        applyFilters(sorted, categoryFilter, topN);
      })
      .catch((err) => console.error("Resume Fetch Error:", err));
  }, [token]);

  const applyFilters = (resumes, category, top) => {
    let filtered = resumes;
    if (category !== "All") {
      filtered = filtered.filter((r) => r.category === category);
    }
    if (top && !isNaN(top)) {
      filtered = filtered.slice(0, Number(top));
    }
    setFilteredResumes(filtered);
  };

  useEffect(() => {
    applyFilters(parsedResumes, categoryFilter, topN);
  }, [categoryFilter, topN, parsedResumes]);

  const handleUpload = async () => {
    if (!selectedJD || selectedFiles.length === 0) {
      alert("Select a Job Description and upload at least one resume.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("resumes", file));
    formData.append("jdId", selectedJD);

    try {
      const res = await axios.post("http://localhost:5000/api/resumes", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check for token error from server
      if (res.data?.error === "Token Invalid: Authentication Failed") {
        alert("Token Invalid: Authentication Failed");
        return;
      }

      const newSorted = [...parsedResumes, ...res.data].sort((a, b) => b.score - a.score);
      setParsedResumes(newSorted);
      applyFilters(newSorted, categoryFilter, topN);
      setSelectedJD("");
      setSelectedFiles([]);
      document.querySelector('input[type="file"]').value = null;
    } catch (err) {
      
        alert("Token Invalid: Authentication Failed");
   
    } finally {
      setLoading(false);
    }
  };

  const handlePropose = async (id) => {
    const resume = parsedResumes.find((r) => r._id === id);
    if (!resume) return;

    await axios.post("http://localhost:5000/api/proposed", resume, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await axios.delete(`http://localhost:5000/api/resumes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updated = parsedResumes.filter((r) => r._id !== id);
    setParsedResumes(updated);
    applyFilters(updated, categoryFilter, topN);
  };

  const handleReject = async (id) => {
    await axios.delete(`http://localhost:5000/api/resumes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updated = parsedResumes.filter((r) => r._id !== id);
    setParsedResumes(updated);
    applyFilters(updated, categoryFilter, topN);
  };

  const openRadar = (resume) => {
    if (!resume.skillsMatched || resume.skillsMatched.length === 0) {
      alert("No skillsMatched data available.");
      return;
    }

    const radarObj = {};
    resume.skillsMatched.forEach(skillStr => {
      const match = skillStr.match(/^(.+?)\((\d+)\)$/); // e.g., ReactJS(9)
      if (match) {
        const skill = match[1].trim();
        const score = parseInt(match[2].trim());
        radarObj[skill] = score;
      }
    });

    setRadarSkills(radarObj);
    setRadarName(resume.name);
    setShowRadar(true);
  };

  const radarData = {
    labels: Object.keys(radarSkills),
    datasets: [
      {
        label: `${radarName}'s Skills (out of 10)`,
        data: Object.values(radarSkills),
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: '#4caf50',
        pointBackgroundColor: '#4caf50',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { stepSize: 1 },
        pointLabels: { font: { size: 12 } },
      },
    },
  };

  return (
    <div className="resume-screen">
      <h2>Resume Screening</h2>

      <div className="upload-section">
        <select value={selectedJD} onChange={(e) => setSelectedJD(e.target.value)}>
          <option value="">Select Job Description</option>
          {jobDescs.map((jd) => (
            <option key={jd._id} value={jd._id}>{jd.jobTitle}</option>
          ))}
        </select>

        <input type="file" multiple accept="application/pdf" onChange={(e) => setSelectedFiles([...e.target.files])} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Processing..." : "Upload & Parse"}
        </button>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Fresher">Fresher</option>
          <option value="Experienced">Experienced</option>
          <option value="Intern">Intern</option>
        </select>

       <input
  type="number"
  min="1"
  placeholder="No. of Candidates"
  value={topN}
  onChange={(e) => setTopN(e.target.value)}
  className="top-n-input"
/>


        <span style={{ marginLeft: "1rem", fontWeight: "bold" }}>
          Total: {filteredResumes.length}
        </span>
      </div>

      <table className="resume-table">
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
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResumes.map((resume, idx) => (
            <tr key={resume._id}>
              <td>{idx + 1}</td>
              <td>{resume.jobTitle}</td>
              <td>{resume.name}</td>
              <td>{resume.email}</td>
              <td>{resume.phone}</td>
              <td>{resume.skillsMatched?.join(", ") || "N/A"}</td>
              <td>{resume.skillGap?.join(", ") || "N/A"}</td>
              <td>{resume.category || "N/A"}</td>
              <td>{resume.score}</td>
              <td> <button className="view-btn" onClick={() => window.open(resume.resumeFileUrl, '_blank')}>View</button></td>
              <td>
                <button className="propose-btn" onClick={() => handlePropose(resume._id)}>Propose</button>
                <button className="reject-btn" onClick={() => handleReject(resume._id)}>Reject</button>
                <button className="view-skills-btn" onClick={() => openRadar(resume)}>View Skills</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showRadar && (
        <div className="radar-modal">
          <div className="radar-box">
            <h3>{radarName}'s Skill Radar</h3>
            <Radar data={radarData} options={radarOptions} />
            <button className="close-radar" onClick={() => setShowRadar(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeScreen;
