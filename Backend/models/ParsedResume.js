const mongoose = require("mongoose");

const parsedResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobDesc" },
  jobTitle: String,
  name: String,
  email: String,
  phone: String,
  skillsMatched: [String],
  skillGap: [String],
  category: String,
  score: Number,
  resumeFileUrl: String, // ✅ Dropbox download link
});

module.exports = mongoose.model("ParsedResume", parsedResumeSchema);
