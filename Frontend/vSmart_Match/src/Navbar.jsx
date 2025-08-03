import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">vSmart</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobdesc">Job Desc</Link></li>
        <li><Link to="/resumescreen">Resume Screen</Link></li>
        <li><Link to="/proposed">Proposed</Link></li>
        <li className="profile-container" ref={dropdownRef}>
          {user ? (
            <>
              <span className="profile-name" onClick={() => setShowDropdown(prev => !prev)}>
                👤 {user.name}
              </span>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={() => { setShowDropdown(false); navigate("/profile"); }}>
                    Profile
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
