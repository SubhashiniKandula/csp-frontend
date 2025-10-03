import React, { useState } from "react";
import "./Home.css";

const skillsData = [
  {
    id: 1,
    title: "JavaScript Programming",
    level: "Advanced",
    category: "Programming",
    description: "Modern JavaScript development including ES6+, React, Node.js",
    name: "Sarah Johnson",
    location: "San Francisco, CA",
    rating: 4.8,
    tags: ["javascript", "react", "nodejs"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    title: "Graphic Design",
    level: "Expert",
    category: "Design",
    description:
      "Logo design, branding, digital illustrations using Adobe Creative Suite",
    name: "Emily Carter",
    location: "New York, USA",
    rating: 4.9,
    tags: ["photoshop", "illustrator", "branding"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    title: "Spanish Language",
    level: "Intermediate",
    category: "Languages",
    description: "Conversational Spanish for travel and business",
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    rating: 4.7,
    tags: ["spanish", "conversation", "grammar"],
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

const Home = () => {
  const [requested, setRequested] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRequest = (id) => {
    if (!requested.includes(id)) {
      setRequested([...requested, id]);
    }
  };

  // Filter skills based on search term
  const filteredSkills = skillsData.filter((skill) =>
    `${skill.title} ${skill.category} ${skill.description} ${skill.name} ${skill.tags.join(" ")}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>
          Share Skills, <span className="highlight">Build Dreams</span>
        </h1>
        <p>
          Connect with learners and teachers worldwide. Exchange knowledge,
          grow together, and build a community of lifelong learners.
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="What skill would you like to learn today?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Search</button>
        </div>
      </div>

      {/* Featured Skills */}
      <div className="skills-section">
        <h2>Featured Skills</h2>

        <div className="skills-grid">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <div key={skill.id} className="skill-card">
                {/* Level & Category */}
                <div className="level-category">
                  <span
                    className={`level ${
                      skill.level === "Expert"
                        ? "expert"
                        : skill.level === "Intermediate"
                        ? "intermediate"
                        : "advanced"
                    }`}
                  >
                    {skill.level}
                  </span>
                  <span className="category">{skill.category}</span>
                </div>

                <h3>{skill.title}</h3>
                <p className="description">{skill.description}</p>

                {/* User Info */}
                <div className="user-info">
                  <img src={skill.avatar} alt={skill.name} />
                  <div>
                    <p className="name">{skill.name}</p>
                    <p className="location">{skill.location}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="tags">
                  {skill.tags.map((tag, index) => (
                    <span key={index}>#{tag}</span>
                  ))}
                </div>

                {/* Request Button */}
                <button
                  onClick={() => handleRequest(skill.id)}
                  disabled={requested.includes(skill.id)}
                  className={`request-btn ${
                    requested.includes(skill.id) ? "requested" : ""
                  }`}
                >
                  {requested.includes(skill.id) ? "Requested" : "Request"}
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No skills found. Try another search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
