import React, { useState } from "react";
import "./FindSkills.css";

const initialSkills = [
  {
    id: 1,
    title: "JavaScript Programming",
    level: "Advanced",
    category: "Programming",
    description: "Modern JavaScript development including ES6+, React, Node.js",
    user: "Sarah Johnson",
    location: "San Francisco, CA",
    rating: 4.8,
    tags: ["#javascript", "#react", "#nodejs"],
    bio: "I am a passionate web developer with 5+ years of experience. I love teaching and collaborating on new projects.",
  },
  {
    id: 2,
    title: "Graphic Design",
    level: "Expert",
    category: "Design",
    description:
      "Logo design, branding, digital illustrations using Adobe Creative Suite",
    user: "Michael Brown",
    location: "New York, USA",
    rating: 4.9,
    tags: ["#photoshop", "#illustrator", "#branding"],
    bio: "Creative graphic designer specializing in branding and digital illustrations. Over 7 years in the field.",
  },
  {
    id: 3,
    title: "Spanish Language",
    level: "Intermediate",
    category: "Languages",
    description: "Conversational Spanish for travel and business",
    user: "Maria Rodriguez",
    location: "Barcelona, Spain",
    rating: 4.7,
    tags: ["#spanish", "#conversation", "#grammar"],
    bio: "Native Spanish speaker, teaching Spanish for over 3 years. Love cultural exchange and meeting new people.",
  },
];

export default function FindSkills() {
  const [search, setSearch] = useState("");
  const [requested, setRequested] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ category: "", level: "" });
  const [selectedSkill, setSelectedSkill] = useState(null); // for modal

  // Filter logic
  const filteredSkills = initialSkills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(search.toLowerCase()) ||
      skill.category.toLowerCase().includes(search.toLowerCase()) ||
      skill.user.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filters.category === "" || skill.category === filters.category;
    const matchesLevel = filters.level === "" || skill.level === filters.level;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleRequest = (id) => {
    if (!requested.includes(id)) {
      setRequested([...requested, id]);
    }
  };

  return (
    <div className="findskills-page">
      <h1 className="page-title">Find Skills</h1>
      <p className="subtitle">
        Discover amazing skills and connect with talented people
      </p>

      {/* Search + Filters */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search for skills, people, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          ⚙ Filters
        </button>
      </div>

      {/* Filters Dropdown */}
      {showFilters && (
        <div className="filters-panel">
          <label>
            Category:
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Languages">Languages</option>
            </select>
          </label>
          <label>
            Level:
            <select
              value={filters.level}
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
        </div>
      )}

      {/* Skills Count */}
      <p className="skills-count">Found {filteredSkills.length} skills</p>

      {/* Cards */}
      <div className="cards-container">
        {filteredSkills.map((skill) => (
          <div
            className="skill-card"
            key={skill.id}
            onClick={() => setSelectedSkill(skill)} // open modal
          >
            <h3 className="skill-title">{skill.title}</h3>
            <div className="badges">
              <span className="badge level">{skill.level}</span>
              <span className="badge category">{skill.category}</span>
            </div>

            <p className="description">{skill.description}</p>

            <div className="user-info">
              <strong>{skill.user}</strong>
              <span>{skill.location}</span>
              <span className="rating">⭐ {skill.rating}</span>
            </div>

            <div className="tags">
              {skill.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <button
              className={`request-btn ${
                requested.includes(skill.id) ? "requested" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); // stop card click
                handleRequest(skill.id);
              }}
              disabled={requested.includes(skill.id)}
            >
              {requested.includes(skill.id) ? "✅ Requested" : "🤝 Request"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSkill && (
        <div className="modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent overlay close
          >
            <h2>{selectedSkill.title}</h2>
            <p>
              <strong>Category:</strong> {selectedSkill.category} |{" "}
              <strong>Level:</strong> {selectedSkill.level}
            </p>
            <p>
              <strong>User:</strong> {selectedSkill.user} | 📍{" "}
              {selectedSkill.location}
            </p>
            <p className="bio">{selectedSkill.bio}</p>
            <p className="rating">⭐ {selectedSkill.rating}</p>
            <div className="tags">
              {selectedSkill.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Request Button inside Modal */}
            <button
              className={`request-btn modal-request ${
                requested.includes(selectedSkill.id) ? "requested" : ""
              }`}
              onClick={() => handleRequest(selectedSkill.id)}
              disabled={requested.includes(selectedSkill.id)}
            >
              {requested.includes(selectedSkill.id)
                ? "✅ Requested"
                : "🤝 Request Skill"}
            </button>

            <button
              className="close-btn"
              onClick={() => setSelectedSkill(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
