import React, { useEffect, useState } from 'react';
import {
  FaTags, FaSpider, FaUsers, FaSearch,
  FaChartLine, FaFileAlt, FaUserTie,
  FaFileUpload, FaFilter, FaDownload, FaComments
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [chatVisible, setChatVisible] = useState(false);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  // Chat visibility toggle
  const toggleChat = () => setChatVisible(!chatVisible);

  // Send user message to Langflow API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'You', message: input };
    setChatLog(prev => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMsg = { sender: 'Bot', message: data.reply };
      setChatLog(prev => [...prev, botMsg]);
      setInput('');
    } catch {
      setChatLog(prev => [...prev, { sender: 'Bot', message: '⚠️ Error contacting server.' }]);
    }
  };

  // Optional embedded chat widget loader (Langflow Embed)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Formatting helpers
  const formatMessage = (text) => {
    const boldFormatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const noBullets = boldFormatted.replace(/^(\s*[-*•]\s*)/gm, '');
    return noBullets;
  };
  const isListFormat = (msg) => msg.includes('\n');

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Empowering Smart Hiring with AI</h2>
          <p className="hero-subtitle">
            vSmart Match leverages automation and intelligence to ensure the right talent finds the right opportunity.
          </p>
          <Link to="/signup" className="btn-cta">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3 className="section-title">Latest Features</h3>
        <div className="feature-grid">
          <div className="feature-card"><FaFileUpload className="icon" /><h4>Resume & JD Upload</h4><p>Upload resumes and job descriptions to analyze and match skills.</p></div>
          <div className="feature-card"><FaSearch className="icon" /><h4>JD Matching</h4><p>Matches uploaded resumes against job descriptions precisely.</p></div>
          <div className="feature-card"><FaSpider className="icon" /><h4>Spider Graph Visualization</h4><p>Visualize skill match insights using spider graphs.</p></div>
          <div className="feature-card"><FaChartLine className="icon" /><h4>Scoring & Filtering</h4><p>Rank and filter candidates based on AI-driven scoring.</p></div>
          <div className="feature-card"><FaDownload className="icon" /><h4>CSV Download</h4><p>Export candidate screening results in one click.</p></div>
          <div className="feature-card"><FaTags className="icon" /><h4>Smart Tagging</h4><p>Automatically categorize Interns, Freshers, Experienced.</p></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>vSmart Match</h4>
            <p>Smart hiring made easier with AI-driven skill analysis and resume matching tools.</p>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 vSmart Match. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Toggle Button */}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        <FaComments /> {chatVisible ? 'Hide Chat' : 'Chat'}
      </button>

      {/* Chat UI */}
      {chatVisible && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>HR ASSISTANCE</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-box">
            {chatLog.map((msg, i) => (
              <div key={i} className={`message ${msg.sender === 'You' ? 'user' : 'bot'}`}>
                {msg.sender === 'Bot' && isListFormat(msg.message) ? (
                  msg.message.split('\n').map((line, idx) => (
                    <div key={idx} className="formatted-response" dangerouslySetInnerHTML={{ __html: formatMessage(line) }} />
                  ))
                ) : (
                  <span className="formatted-response" dangerouslySetInnerHTML={{ __html: formatMessage(msg.message) }} />
                )}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
