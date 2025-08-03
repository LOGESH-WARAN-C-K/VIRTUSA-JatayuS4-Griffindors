const express = require("express");
const router = express.Router();
const ProposedResume = require("../models/ProposedResume");
const auth = require("../middleware/auth");

// Save proposed resume
router.post("/", auth, async (req, res) => {
  try {
    const proposed = await ProposedResume.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(proposed);
  } catch (err) {
    res.status(500).json({ error: "Failed to save proposed resume" });
  }
});

// Get all proposed resumes for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const data = await ProposedResume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch proposed resumes" });
  }
});

// DELETE route for a proposed resume
router.delete("/:id", auth, async (req, res) => {
  try {
    await ProposedResume.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
