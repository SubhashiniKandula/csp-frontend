import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Home from "./Home";
import Profile from "./Profile";
import Request from "./Request";
import Matching from "./Matching";
import FindSkills from "./FindSkills";
import Messaging from "./Messaging";
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";

// Import shared components
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        {/* Page Content */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request" element={<Request />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/find-skills" element={<FindSkills />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
