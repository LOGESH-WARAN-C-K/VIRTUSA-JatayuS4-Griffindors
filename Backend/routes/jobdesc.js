const express = require("express");
const router = express.Router();
const JobDesc = require("../models/JobDesc");
const auth = require("../middleware/auth");

// CREATE - POST /api/jobdesc
router.post("/", auth, async (req, res) => {
  try {
    const { jobTitle, jobDesc, requirementCount } = req.body;

    // Simple validation
    if (!jobTitle || !jobDesc || !requirementCount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = new JobDesc({
      jobTitle,
      jobDesc,
      requirementCount,
      user: req.user.id
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error in POST /jobdesc:", err);
    res.status(500).json({ error: "Failed to create job description" });
  }
});

// READ - GET /api/jobdesc
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await JobDesc.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error in GET /jobdesc:", err);
    res.status(500).json({ error: "Failed to fetch job descriptions" });
  }
});

// UPDATE - PUT /api/jobdesc/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const { jobTitle, jobDesc, requirementCount } = req.body;

    if (!jobTitle || !jobDesc || !requirementCount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedJob = await JobDesc.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { jobTitle, jobDesc, requirementCount },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found or unauthorized" });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("Error in PUT /jobdesc/:id:", err);
    res.status(500).json({ error: "Failed to update job description" });
  }
});

// DELETE - DELETE /api/jobdesc/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedJob = await JobDesc.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found or unauthorized" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error in DELETE /jobdesc/:id:", err);
    res.status(500).json({ error: "Failed to delete job description" });
  }
});

module.exports = router;
