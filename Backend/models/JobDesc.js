const mongoose = require("mongoose");

const JobDescSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobDesc: {
      type: String,
      required: true,
    },
    requirementCount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobDesc", JobDescSchema);
