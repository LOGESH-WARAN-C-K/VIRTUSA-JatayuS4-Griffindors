# vSmart Match Gen AI Powered Talent Focussed 🔍💼

**vSmart Match** is an AI-powered resume screening and HR assistance platform built using the **MERN stack** and integrated with **Langflow + LangSmith** for intelligent parsing, scoring, and visualization of resumes.

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

## 📋 Prerequisites

Ensure the following are installed:
- **Node.js** (v18+)
- **npm** (v8+)
- **Python** 3.9+
- **Git**
- **MongoDB** (local or Atlas)
- **Dropbox** developer token
- **Langflow & LangSmith** account

## 🛠️ Quick Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vsmart-match.git
cd vsmart-match
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
cd ..
```

### 3. Environment Configuration

#### Backend Setup

Create the backend `.env` file by running this command in your project root:

```bash
# Create the backend .env file
cat <<EOL > ./Backend/.env
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
EOL
```

**Environment Variables Explanation:**

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/vsmart_match` or `mongodb+srv://user:pass@cluster.mongodb.net/vsmart_match` |
| `JWT_SECRET` | Secret key for JWT token generation | `your_super_secret_jwt_key_make_it_long_and_secure` |
| `DROPBOX_ACCESS_TOKEN` | Dropbox API access token | Get from [Dropbox App Console](https://www.dropbox.com/developers/apps) |
| `LANGFLOW_API_KEY` | Langflow API authentication key | Generated from your Langflow instance |
| `LANGFLOW_FLOW_ID` | Specific flow ID for resume processing | Found in your Langflow dashboard |
| `PORT` | Backend server port | `5000` (default) |
| `LANGSMITH_TRACING` | Enable LangSmith tracing | `true` or `false` |
| `LANGSMITH_ENDPOINT` | LangSmith API endpoint | `https://api.smith.langchain.com` |
| `LANGSMITH_API_KEY` | LangSmith API key | Get from [LangSmith Dashboard](https://smith.langchain.com/) |
| `LANGSMITH_PROJECT` | Project name in LangSmith | `vSmart_Match` |

#### Frontend Setup

Create the frontend `.env` file by running this command in your project root:

```bash
# Create the frontend .env file
cat <<EOL > ./Frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:5000
EOL
```

**Frontend Environment Variables:**

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `REACT_APP_BASE_URL` | Backend server base URL | `http://localhost:5000` |

### 4. Start the Application

#### Start Backend Server

```bash
cd Backend
npm run dev
# Backend will run on http://localhost:5000
```

#### Start Frontend Server (in a new terminal)

```bash
cd Frontend
npm start
# Frontend will run on http://localhost:3000
```

## 🗄️ Database Setup

### MongoDB Local Setup

1. **Install MongoDB Community Edition**
2. **Start MongoDB service:**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

### MongoDB Atlas Setup (Alternative)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`
4. Whitelist your IP address

## 🤖 AI Integration Setup

### Langflow Setup

1. **Install Langflow:**
   ```bash
   pip install langflow
   ```

2. **Start Langflow:**
   ```bash
   langflow run --host 0.0.0.0 --port 7860
   ```

3. **Create your flow and get Flow ID**
4. **Update `LANGFLOW_FLOW_ID` in backend `.env`**

### LangSmith Setup

1. Sign up at [LangSmith](https://smith.langchain.com/)
2. Create a new project
3. Get API key and update `.env` variables

## ☁️ Dropbox Integration Setup

1. **Create Dropbox App:**
   - Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
   - Create new app with "Scoped access"
   - Generate access token

2. **Update environment variables with Dropbox credentials**

## 🚀 Production Deployment

### Backend Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Serve build files (using serve package)
npm install -g serve
serve -s build -l 3000
```

## 📁 Project Structure

```
vSmart_Match/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Home.css & Home.jsx
│   │   │   ├── JobDesc.css & JobDesc.jsx
│   │   │   ├── Login.css & Login.jsx
│   │   │   ├── ProfilePage.css & ProfilePage.jsx
│   │   │   ├── Proposed.css & Proposed.jsx
│   │   │   └── ResumeScreen.css & ResumeScreen.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── MainPage.jsx
│   │   ├── Navbar.css & Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── package.json
│   └── .env
└── Backend/
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── verifyToken.js
    ├── models/
    │   ├── JobDesc.js
    │   ├── ParsedResume.js
    │   ├── ProposedResume.js
    │   └── User.js
    ├── routes/
    │   ├── auth.js
    │   ├── chatbot.js
    │   ├── jobdesc.js
    │   ├── proposed.js
    │   ├── resumes.js
    │   └── user.js
    ├── uploads/
    ├── server.js
    ├── package.json
    └── .env
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Job Descriptions
- `GET /api/jobdesc` - Get all job descriptions
- `POST /api/jobdesc` - Create new job description
- `PUT /api/jobdesc/:id` - Update job description
- `DELETE /api/jobdesc/:id` - Delete job description

### Resumes
- `POST /api/resumes/upload` - Upload and parse resume
- `GET /api/resumes` - Get all parsed resumes
- `GET /api/resumes/:id` - Get specific resume
- `DELETE /api/resumes/:id` - Delete resume

### Proposals
- `POST /api/proposed` - Propose candidate
- `GET /api/proposed` - Get all proposals
- `PUT /api/proposed/:id` - Update proposal status
- `GET /api/proposed/export` - Export to CSV

### Chatbot
- `POST /api/chatbot/query` - Send query to AI chatbot

## 🧪 Testing

### Backend Testing
```bash
cd Backend
npm test
```

### Frontend Testing
```bash
cd Frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity for Atlas

2. **File Upload Issues:**
   - Check `MAX_FILE_SIZE` in both frontend and backend
   - Ensure `uploads` directory exists
   - Verify file permissions

3. **Langflow Connection Error:**
   - Ensure Langflow is running on specified port
   - Check `LANGFLOW_BASE_URL` and `LANGFLOW_API_KEY`
   - Verify flow ID is correct

4. **CORS Issues:**
   - Update `FRONTEND_URL` in backend `.env`
   - Check CORS middleware configuration

### Logs and Debugging

Backend logs are available in the console when running in development mode. For production, consider implementing proper logging with Winston or similar.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer** - React.js, UI/UX
- **Backend Developer** - Node.js, Express.js
- **AI/ML Engineer** - Langflow, LangSmith Integration
