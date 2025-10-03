import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaExchangeAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoClick = () => {
    navigate("/"); // navigate to home page
  };

  return (
    <nav className="navbar">
      {/* Left side app logo */}
      <div className="logo" onClick={handleLogoClick}>
        <div className="logo-icon">
          <FaExchangeAlt className="exchange-icon" />
        </div>
        <span className="logo-text">SkillSwap</span>
      </div>

      {/* Center links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/request">Request</Link></li>
        <li><Link to="/matching">Matching</Link></li>
        <li><Link to="/find-skills">Find Skills</Link></li>
        <li><Link to="/messaging">Messaging</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {/* Right side user dropdown */}
      <div className="user-menu">
        <div className="user-icon" onClick={toggleDropdown}>
          <FaUserCircle size={24} />
          <FaChevronDown size={14} />
        </div>
        {dropdownOpen && (
          <div className="dropdown">
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
