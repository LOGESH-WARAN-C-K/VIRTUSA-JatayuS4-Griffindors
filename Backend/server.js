const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// Routes
const authRoutes = require("./routes/auth");
const jobDescRoutes = require("./routes/jobdesc");
const resumeRoutes = require("./routes/resumes");
const proposedRoutes = require("./routes/proposed");
const chatbotRoutes = require('./routes/chatbot');


app.use("/api", authRoutes);
app.use("/api/jobdesc", jobDescRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/proposed", proposedRoutes);
app.use("/api/user", require("./routes/user")); // for /update route

app.use('/api/chat', chatbotRoutes);