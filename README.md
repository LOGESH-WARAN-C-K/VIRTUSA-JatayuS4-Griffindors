

# 📘 vSmart Match – Gen AI Powered , Talent Focused 

## 🧠 Overview

**vSmart Match** is a **GenAI-powered Talent Focused ** built with the **MERN stack**, integrated with **Langflow** and **LangSmith** for intelligent resume parsing, certificate validation, scoring, and contextual skill analysis. Results are visualized through dashboards and radar charts to support smarter, faster hiring decisions.

---

## 🚀 Features

* ✍️ Create and manage rich job descriptions
* 📄 Upload and parse resumes (PDFs)
* 🧠 GenAI-powered skill extraction, certificate validation & resume scoring
* 📊 Spider chart visualization using Chart.js
* 🔍 Filter candidates by job description, score, and category
* 📥 Propose/reject candidates & export filtered results to CSV
* 🤖 GenAI-based chatbot for HR assistance
* ☁️ Dropbox integration for cloud resume storage
* 🔐 JWT authentication & user profile management
* 🧪 Langflow + LangSmith integration for contextual parsing, scoring, and traceable AI workflows

---

## 📋 Prerequisites

Ensure the following tools and services are installed/configured:

* Node.js (v18 or higher)
* npm (v8 or higher)
* Python (v3.9 or higher)
* Git
* MongoDB (local or Atlas)
* Dropbox Developer Token
* Langflow & LangSmith accounts with API keys

---

## 🛠️ Quick Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vsmart-match.git
cd vsmart-match
```

### 2. Install Dependencies

```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend/vSmart_Match
npm install
```

### 3. Environment Configuration

Create a `.env` file for both frontend and backend.

#### Backend `.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token
LANGFLOW_API_KEY=your_langflow_api_key
LANGFLOW_FLOW_ID=your_flow_id
PORT=5000

LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_API_KEY=your_langsmith_api_key
LANGSMITH_PROJECT=vSmart_Match
```

### 4. Start the Application

#### Start Backend:

```bash
cd Backend
node server.js
# Runs at http://localhost:5000
```

#### Start Frontend:

```bash
cd Frontend/vSmart_Match
npm run dev
# Runs at http://localhost:3000
```

---

## 🗄️ Database Setup

1. Sign up at [[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Replace `MONGO_URI` in your backend `.env`
4. Whitelist your IP address

---

## 🤖 AI Integration Setup

### Langflow Setup

```bash
pip install langflow
langflow run --host 0.0.0.0 --port 7860
```

* Create your AI flow
* Get the **Flow ID**
* Add to `.env` as `LANGFLOW_FLOW_ID`

### [LangSmith](https://smith.langchain.com/) Setup

1. Sign up at [LangSmith](https://smith.langchain.com)
2. Create a new project
3. Get your API key and update the backend `.env`

---

## ☁ Dropbox Integration Setup

1. Go to [[Dropbox App Console](https://www.dropbox.com/developers/apps)](https://www.dropbox.com/developers/apps)
2. Create a new app with **Scoped access**
3. Generate access token
4. Add token to `.env`

---

## 🗂️ Project Structure

```
vSmart_Match/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Home.jsx, JobDesc.jsx, Login.jsx
│   │   │   ├── ResumeScreen.jsx, Proposed.jsx, ProfilePage.jsx
│   │   ├── App.jsx, main.jsx, MainPage.jsx
│   │   └── ProtectedRoute.jsx
│   ├── package.json
│   └── .env
├── Backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
```

---

## 🖼️ Screenshots

### 🔐 Login & Signup Page  
![Login & Signup](https://drive.google.com/uc?export=view&id=1xqUbfckgEBJHgO6kD-mjg-Bx6tiVKGle)

### 🏠 Home Page  
![Home Page](https://drive.google.com/uc?export=view&id=1qEHEv-7UmHuVOgahalSXVmfnuoZg3x0c)

### 💬 HR ChatBot  
![HR ChatBot](https://drive.google.com/uc?export=view&id=1HfkXvb8gycidpdxGtfsCRHibbYa2dOqX)

### 📄 Job Description  
![Job Description](https://drive.google.com/uc?export=view&id=1fQb_srcfKOakdqc5dYc4jDShbuejX09V)

### 📑 Resume Screening Page  
![Resume Screening](https://drive.google.com/uc?export=view&id=1PQdOS1u78vKejuGyZ4NGkcMo_LVkQcIo)

### 📊 Spider Graph (Skill Visualization)  
![Spider Graph](https://drive.google.com/uc?export=view&id=1cUKMsrpSBAHv4-S4qBZn4G2SDKkzI7Ti)

### ✅ Proposed Resumes Page  
![Proposed Resumes](https://drive.google.com/uc?export=view&id=19VmAGVV8an2Yl9QhKuaX9wDH4jayuHhF)

### 📥 Exported CSV  
![Exported CSV](https://drive.google.com/uc?export=view&id=13soiS9WwdeR8v-gNRFBoXgO_wyGo3zan)

### 👤 Profile Page  
![Profile Page](https://drive.google.com/uc?export=view&id=1GVD2NgAhvIIdAQzN19m-W119ysiBqAdK)

### 📂 Resume Screening via Langflow RAG  
![Langflow RAG](https://drive.google.com/uc?export=view&id=1Y1SiKrp2ZrTxVMmdKyDoNWabIupI25pf)

### 🤖 GenAI Chatbot via Langflow  
![GenAI Chatbot](https://drive.google.com/uc?export=view&id=17TnQ9cphkKSLHi7gqAXe_zOMoEKJ9Amn)

### 📈 LangSmith Trace + Monitor  
![LangSmith Trace](https://drive.google.com/uc?export=view&id=1vtQYKMXmCBraLZvJDO01GsHaFr0QNYPZ)

---

## 🧩 Future Enhancements

1. **RAG Model Integration for Context-Aware Responses**
2. **AI Vector Database for Semantic Resume Search**
3. **Enhanced Security with Role-Based Access Control (RBAC)**
4. **Langfuse Integration for External Monitoring & Tracing**

---

## 🧱 Deployment Plan

| Component                | Hosting Platform      | Notes                           |
| ------------------------ | --------------------- | ------------------------------- |
| Frontend (React)         | Render                | Free/low-tier Node environment  |
| Backend (Express)        | Render                | Connected to MongoDB & Langflow |
| Langflow                 | Render or Self-hosted | Port 7860                       |
| LangSmith                | Cloud SaaS            | Used for tracing/debugging      |
| Database (MongoDB Atlas) | Cloud                 | Shared/Free Tier DB             |
| Resume Storage (Dropbox) | Cloud                 | Public links for resume access  |

---

## 🏗️ Architecture Diagram

![Diagram](https://drive.google.com/uc?export=view&id=1IATAXXPBj8_XbJaG1oAUb8NBq3ixNxcn)

---

## 👥 Team

* **Frontend Developer** – React.js, UI/UX
* **Backend Developer** – Node.js, Express.js, MongoDB
* **AI/ML Engineer** – Langflow, LangSmith Integration

---

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.


