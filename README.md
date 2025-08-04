# vSmart Match 🔍💼

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

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vsmart-match.git
cd vsmart-match
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

#### Backend Environment Configuration

Create a `.env` file in the `Backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/vsmart_match
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vsmart_match

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Langflow Configuration
LANGFLOW_BASE_URL=http://localhost:7860
LANGFLOW_API_KEY=your_langflow_api_key_here
LANGFLOW_FLOW_ID=your_flow_id_here

# LangSmith Configuration
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
LANGCHAIN_API_KEY=your_langsmith_api_key_here
LANGCHAIN_PROJECT=vsmart-match

# Dropbox Integration
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token_here
DROPBOX_APP_KEY=your_dropbox_app_key_here
DROPBOX_APP_SECRET=your_dropbox_app_secret_here

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Email Configuration (optional)
EMAIL_FROM=noreply@vsmartmatch.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# AI Model Configuration
OPENAI_API_KEY=your_openai_api_key_here
MODEL_TEMPERATURE=0.7
MAX_TOKENS=1000

# Resume Parsing Configuration
PDF_PARSER_TIMEOUT=30000
SKILL_EXTRACTION_THRESHOLD=0.5
```

#### Start Backend Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend
npm install
```

#### Frontend Environment Configuration

Create a `.env` file in the `Frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:5000

# Application Configuration
REACT_APP_NAME=vSmart Match
REACT_APP_VERSION=1.0.0

# File Upload Limits
REACT_APP_MAX_FILE_SIZE=10485760
REACT_APP_ALLOWED_FILE_TYPES=.pdf,.doc,.docx

# Chart.js Configuration
REACT_APP_CHART_ANIMATION_DURATION=1000

# Dropbox Configuration (Frontend)
REACT_APP_DROPBOX_APP_KEY=your_dropbox_app_key_here

# Feature Flags
REACT_APP_ENABLE_CHATBOT=true
REACT_APP_ENABLE_EXPORT=true
REACT_APP_ENABLE_ANALYTICS=true
```

#### Start Frontend Development Server

```bash
npm start
```

The frontend application will run on `http://localhost:3000`

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
- **DevOps Engineer** - Deployment, CI/CD


## 🔧 Environment Configuration

### 📂 Frontend: `/Frontend/vSmartMatch/.env`
```bash
# Create the frontend .env file
echo "REACT_APP_BACKEND_URL=http://localhost:5000/api" > ./Frontend/vSmartMatch/.env

