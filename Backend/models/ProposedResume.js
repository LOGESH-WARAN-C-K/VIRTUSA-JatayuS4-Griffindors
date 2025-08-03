const mongoose = require("mongoose");

const ProposedResumeSchema = new mongoose.Schema({
  jobTitle: String,
  name: String,
  email: String,
  phone: String,
  skillsMatched: [String],
  skillGap: [String],
  category: String, 
  score: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("ProposedResume", ProposedResumeSchema);
