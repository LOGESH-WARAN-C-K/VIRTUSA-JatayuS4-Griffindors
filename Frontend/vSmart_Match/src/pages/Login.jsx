import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ setUser }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
    setForm({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isPasswordValid = (password) => {
    const minLength = 6;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= minLength && hasLetter && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && !isPasswordValid(form.password)) {
      alert("Password must be at least 6 characters long and include both letters and numbers.");
      return;
    }

    const url = isSignup
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    try {
      if (isSignup) {
        await axios.post(url, form);
        alert("Signup successful! Please login.");
        setIsSignup(false);
      } else {
        const res = await axios.post(url, form);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: res.data.name, email: res.data.email })
        );
        setUser(res.data);
        alert("Login successful!");
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.response?.data?.message || "Authentication failed. Please try again.");
    }
  };

  return (
    <div className={`login-wrapper ${isSignup ? "login-signup-mode" : ""}`}>
      <div className="login-box">
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">{isSignup ? "Sign Up" : "Login"}</h2>

            {isSignup && (
              <div className="login-form-group">
                <input
                  type="text"
                  name="name"
                  className="login-name-input"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
              </div>
            )}

            <div className="login-form-group">
              <input
                type="email"
                name="email"
                className="login-email-input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="login-form-group">
              <input
                type="password"
                name="password"
                className="login-password-input"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>

            <button type="submit" className="login-submit-btn">
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <p className="login-toggle-text">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span onClick={handleToggle}>
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </form>
        </div>

        <div className="login-side-panel">
          <h3 className="login-panel-heading">{isSignup ? "Welcome!" : "Hello!"}</h3>
          <p className="login-panel-text">
            {isSignup
              ? "Create your account to join vSmart"
              : "Log in to access your dashboard"}
          </p>
          <button className="login-ghost-btn" onClick={handleToggle}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
