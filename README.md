# vSmart Match 🔍💼

**vSmart Match** is an AI-powered resume screening and HR assistance platform built using the **MERN stack** and integrated with **Langflow + LangSmith** for intelligent parsing, scoring, and visualization of resumes.

---

## 🚀 Features

- ✍️ Create and manage rich job descriptions
- 📄 Upload and parse resumes (PDFs)
- 🧠 AI-powered skill extraction & resume scoring
- 📊 Spider chart visualization using Chart.js
- 🔍 Filter candidates by JD, score, and category
- 📥 Propose/reject candidates & export to CSV
- 🤖 GenAI-based chatbot for HR assistance
- ☁️ Dropbox integration for cloud resume storage
- 🔐 JWT authentication & profile management

---

## 📋 Prerequisites

Ensure the following are installed:

- Node.js (v18+)
- npm (v8+)
- Python 3.9+
- Git
- MongoDB (local or Atlas)
- Dropbox developer token
- Langflow & LangSmith account

---

## 🔐 Environment Variables

### 🔧 Frontend: `/Frontend/vSmartMatch/.env`

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token
LANGFLOW_API_KEY=your_langflow_api_key
LANGFLOW_FLOW_ID=your_flow_id
PORT=5000

🧠 Langflow & LangSmith Setup
These tools provide the AI brain for resume parsing and recommendation.

1. Install Langflow
bash
Copy
Edit
pip install langflow
2. Setup LangSmith
In your /Backend/.env file, add:

bash
Copy
Edit
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_API_KEY=your_langsmith_api_key
LANGSMITH_PROJECT=vSmart_Match
💻 Running the Project
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/vSmart-Match.git
cd vSmart-Match
2. Backend Setup
bash
Copy
Edit
cd Backend
npm install
npm start
Runs on: http://localhost:5000

3. Frontend Setup
bash
Copy
Edit
cd Frontend/vSmartMatch
npm install
npm start
Runs on: http://localhost:3000
```env
REACT_APP_BACKEND_URL=http://localhost:5000/api
