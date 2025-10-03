import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Clear any stored user info (localStorage/sessionStorage)
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      alert("Logged out successfully!");
      navigate("/login"); // redirect to login page
    };

    handleLogout();
  }, [navigate]);

  return null; // nothing visible on screen
}