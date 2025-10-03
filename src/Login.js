import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Official Google icon
import { signInWithGoogle, signInWithGithub } from "./firebase";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can implement email/password authentication with Firebase or backend
    console.log("Email:", email, "Password:", password);
    navigate("/"); // Redirect to home/dashboard
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Redirect after successful login
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      navigate("/"); // Redirect after successful login
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle size={20} style={{ marginRight: "8px" }} /> Login with Google
          </button>
          <button className="github-btn" onClick={handleGithubLogin}>
            <FaGithub size={20} style={{ marginRight: "8px" }} /> Login with GitHub
          </button>
        </div>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
