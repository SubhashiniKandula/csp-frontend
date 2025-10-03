import React, { useState } from "react";
import "./Matching.css";

function Matching() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [pendingMatches, setPendingMatches] = useState([
    {
      id: 1,
      name: "Maria Rodriguez",
      rating: 4.7,
      reviews: 18,
      location: "Barcelona, Spain",
      date: "14/01/2024",
      bio: "Language teacher and cultural exchange enthusiast",
      interests: ["Design", "Photography"],
      skills: ["Spanish Language (Intermediate)"],
      matchPercent: 72,
      img: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "John Smith",
      rating: 4.5,
      reviews: 10,
      location: "London, UK",
      date: "20/02/2024",
      bio: "Software engineer who loves teaching coding",
      interests: ["Coding", "Chess"],
      skills: ["JavaScript", "React"],
      matchPercent: 80,
      img: "https://via.placeholder.com/60",
    },
  ]);

  const [acceptedMatches, setAcceptedMatches] = useState([]);
  const [activeMatches, setActiveMatches] = useState([]);

  // Handle Accept
  const handleAccept = (match) => {
    setAcceptedMatches([...acceptedMatches, match]);
    setPendingMatches(pendingMatches.filter((m) => m.id !== match.id));
  };

  // Handle Pass
  const handlePass = (match) => {
    setPendingMatches(pendingMatches.filter((m) => m.id !== match.id));
  };

  const renderMatches = (matches) => {
    if (matches.length === 0) {
      return <p className="empty-msg">No matches in this category.</p>;
    }

    return matches.map((match) => (
      <div className="match-card" key={match.id}>
        <div className="match-header">
          <img src={match.img} alt="profile" className="profile-img" />
          <div className="match-info">
            <h3 className="name">
              {match.name}{" "}
              <span className="rating">
                ⭐ {match.rating} ({match.reviews} reviews)
              </span>
            </h3>
            <p className="location">
              📍 {match.location} • Matched {match.date}
            </p>
            <p className="bio">{match.bio}</p>
          </div>
          <div className="match-percent">💙 {match.matchPercent}% Match</div>
        </div>

        <div className="match-details">
          <p>
            <strong>Shared Interests:</strong>
          </p>
          {match.interests.map((interest, i) => (
            <span className="tag" key={i}>
              {interest}
            </span>
          ))}

          <p className="skills">
            <strong>Their Skills:</strong>
          </p>
          {match.skills.map((skill, i) => (
            <span className="skill" key={i}>
              {skill}
            </span>
          ))}
        </div>

        {activeTab === "Pending" && (
          <div className="match-actions">
            <button className="accept-btn" onClick={() => handleAccept(match)}>
              ✔ Accept Match
            </button>
            <button className="pass-btn" onClick={() => handlePass(match)}>
              ✖ Pass
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="matching-container">
      <h2 className="title">Skill Matches</h2>
      <p className="subtitle">
        Connect with people who have complementary skills
      </p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Pending" ? "active" : ""}`}
          onClick={() => setActiveTab("Pending")}
        >
          Pending <span className="badge">{pendingMatches.length}</span>
        </button>
        <button
          className={`tab ${activeTab === "Accepted" ? "active" : ""}`}
          onClick={() => setActiveTab("Accepted")}
        >
          Accepted <span className="badge">{acceptedMatches.length}</span>
        </button>
        <button
          className={`tab ${activeTab === "Active" ? "active" : ""}`}
          onClick={() => setActiveTab("Active")}
        >
          Active <span className="badge">{activeMatches.length}</span>
        </button>
      </div>

      {/* Match List */}
      {activeTab === "Pending" && renderMatches(pendingMatches)}
      {activeTab === "Accepted" && renderMatches(acceptedMatches)}
      {activeTab === "Active" && renderMatches(activeMatches)}
    </div>
  );
}

export default Matching;
