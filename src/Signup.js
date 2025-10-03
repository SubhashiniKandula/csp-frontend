import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signInWithGithub } from "./firebase";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Add email/password signup logic here
    console.log("Name:", name, "Email:", email, "Password:", password);
    navigate("/login"); // Redirect after signup
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  const handleGithubSignup = async () => {
    try {
      await signInWithGithub();
      navigate("/");
    } catch (error) {
      console.error("GitHub signup error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleSignup}>
            <FcGoogle size={20} style={{ marginRight: "8px" }} /> Sign up with Google
          </button>
          <button className="github-btn" onClick={handleGithubSignup}>
            <FaGithub size={20} style={{ marginRight: "8px" }} /> Sign up with GitHub
          </button>
        </div>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
