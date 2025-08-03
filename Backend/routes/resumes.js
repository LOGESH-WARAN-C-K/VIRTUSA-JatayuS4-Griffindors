const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const ParsedResume = require("../models/ParsedResume");
const JobDesc = require("../models/JobDesc");
const auth = require("../middleware/auth");
const axios = require("axios");

require("dotenv").config();
const { Dropbox } = require("dropbox");
const fetch = require("isomorphic-fetch");

// Setup multer
const upload = multer({ dest: "uploads/" });

// Setup Dropbox
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN, fetch });

// Upload to Dropbox
async function uploadToDropbox(localFilePath, dropboxPath) {
  const content = fs.readFileSync(localFilePath);
  const response = await dbx.filesUpload({
    path: dropboxPath,
    contents: content,
    mode: "add",
    autorename: true,
  });
  return response.result;
}

// Generate Dropbox download link
async function getDropboxDownloadLink(path) {
  try {
    const linkRes = await dbx.sharingCreateSharedLinkWithSettings({ path });
    return linkRes.result.url.replace("?dl=0", "?dl=1");
  } catch (error) {
    if (
      error?.error?.error_summary?.includes("shared_link_already_exists") ||
      error?.error?.[".tag"] === "shared_link_already_exists"
    ) {
      try {
        const existing = await dbx.sharingListSharedLinks({
          path,
          direct_only: true,
        });
        if (existing.result.links.length > 0) {
          return existing.result.links[0].url.replace("?dl=0", "?dl=1");
        } else {
          throw new Error("No existing Dropbox shared link found");
        }
      } catch (err) {
        console.error("Failed to list existing Dropbox links:", err.message);
        throw new Error("Dropbox fallback link generation failed");
      }
    }

    console.error("Dropbox link generation error:", error);
    throw new Error("Dropbox link generation failed");
  }
}

// Extract plain text from PDF
const extractResumeText = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
};


  
// Send to Langflow
const sendToLangflow = async (resumeText, jobDescription) => {
  const token = "9f2d7b6c3e8a1f04";
  const langflowApiKey = process.env.LANGFLOW_API_KEY;

  const payload = {
    output_type: "chat",
    input_type: "text",
    tweaks: {
      "GroqModel-sGYma": { stream: false },
      "CustomComponent-DnCov": {
        jd_input: jobDescription,
        resume_input: resumeText,
        token_input: token, // Keep this token unchanged
      },
    },
  };

  const res = await axios.post(
    "http://localhost:7860/api/v1/run/7e33f271-2faf-4cdf-958e-7d2f3df2a784?stream=false",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": langflowApiKey, // Use LANGFLOW_API_KEY from .env
      },
      timeout: 500000,
    }
  );

  const message = res.data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
  return message?.replace(/```(\w+)?/g, "").trim();
};


// POST /api/resumes - Upload & Parse
router.post("/", auth, upload.array("resumes"), async (req, res) => {
  const { jdId } = req.body;
  const job = await JobDesc.findById(jdId);
  const results = [];
  const tokenErrors = [];

  // Get current resume count for naming
  let count = await ParsedResume.countDocuments();

  for (const file of req.files) {
    try {
      const resumeText = await extractResumeText(file.path);
      const parsedText = await sendToLangflow(resumeText, job.jobDesc);

      // ✅ Check for token error from Langflow
      if (parsedText.includes("Token Invalid: Authentication Failed")) {
        console.warn("Token Invalid: Authentication Failed for file:", file.originalname);
        tokenErrors.push(file.originalname);
        continue; // Skip upload and DB save
      }

      const json = JSON.parse(parsedText);

      const skillsMatched = (json["Skills Matched"] || []).map((item) => {
        if (typeof item === "string" && item.includes("(")) return item;
        if (typeof item === "object" && item.skill && item.score) {
          return `${item.skill}(${item.score})`;
        }
        return item;
      });

      // Sequential Dropbox file name
      count += 1;
      const dropboxFileName = `resume_${count}.pdf`;
      const dropboxPath = `/${dropboxFileName}`;

      // Upload to Dropbox
      const uploaded = await uploadToDropbox(file.path, dropboxPath);
      const downloadLink = await getDropboxDownloadLink(uploaded.path_lower);

      // Save to DB
      const resume = await ParsedResume.create({
        user: req.user.id,
        jobId: jdId,
        jobTitle: job.jobTitle,
        name: json["Full Name"] || "N/A",
        email: json["Email Address"] || "N/A",
        phone: json["Phone Number"] || "N/A",
        skillsMatched: skillsMatched,
        skillGap: json["Skill Gap"] || [],
        category: json["Category"] || "N/A",
        score: json["Score"] || 0,
        resumeFileUrl: downloadLink,
      });

      results.push(resume);
    } catch (err) {
      console.error("Resume Parse Error:", err.message);
    } finally {
      fs.unlinkSync(file.path); // Clean up temp file
    }
  }

  // Return results + any token failure alerts
  if (tokenErrors.length > 0) {
    return res.status(401).json({
      message: `Token Invalid: Authentication Failed for ${tokenErrors.length} resume(s): ${tokenErrors.join(", ")}`,
      results,
    });
  }

  res.json(results);
});

// GET all resumes
router.get("/", auth, async (req, res) => {
  const resumes = await ParsedResume.find({ user: req.user.id });
  res.json(resumes);
});

// DELETE resume
router.delete("/:id", auth, async (req, res) => {
  await ParsedResume.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Deleted" });
});

// PROPOSE resume
router.post("/propose/:id", auth, async (req, res) => {
  await ParsedResume.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Proposed" });
});

module.exports = router;
