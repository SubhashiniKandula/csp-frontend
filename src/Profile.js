import React, { useState } from "react";
import "./Profile.css";

const MySkills = () => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      title: "JavaScript Programming",
      level: "Advanced",
      category: "Programming",
      type: "Can Teach",
      description: "Modern JavaScript development including ES6+, React, Node.js",
      tags: ["#javascript", "#react", "#nodejs", "#frontend"],
    },
    {
      id: 2,
      title: "Graphic Design",
      level: "Expert",
      category: "Design",
      type: "Can Teach",
      description: "Logo design, branding, digital illustrations using Adobe Creative Suite",
      tags: ["#photoshop", "#illustrator", "#branding", "#logo"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    level: "Beginner",
    category: "",
    type: "Can Teach",
    description: "",
    tags: "",
  });

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        title: skill.title,
        level: skill.level,
        category: skill.category,
        type: skill.type,
        description: skill.description,
        tags: skill.tags.join(", "),
      });
    } else {
      setEditingSkill(null);
      setFormData({
        title: "",
        level: "Beginner",
        category: "",
        type: "Can Teach",
        description: "",
        tags: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingSkill) {
      setSkills(
        skills.map((s) =>
          s.id === editingSkill.id
            ? {
                ...editingSkill,
                ...formData,
                tags: formData.tags.split(",").map((tag) => tag.trim()),
              }
            : s
        )
      );
    } else {
      setSkills([
        ...skills,
        {
          id: Date.now(),
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="myskills-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
          alt="Profile Avatar"
          className="profile-avatar"
        />
        <h2 className="username">Subhashini</h2>
      </div>

      {/* Page Header */}
      <div className="header">
        <h1>My Skills</h1>
        <p>Manage your skills and expertise</p>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          ➕ Add Skill
        </button>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">
          📘
          <p>0</p>
          <small>Learning</small>
        </div>
        <div className="stat-card">
          📊
          <p>{skills.length}</p>
          <small>Teaching</small>
        </div>
        <div className="stat-card">
          🏅
          <p>{skills.length}</p>
          <small>Total Skills</small>
        </div>
      </div>

      {/* Skills List */}
      <div className="skills-list">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.id}>
            <div className="skill-header">
              <h3>{skill.title}</h3>
              <div className="actions">
                <button onClick={() => handleOpenModal(skill)}>✏️</button>
                <button onClick={() => handleDelete(skill.id)}>🗑️</button>
              </div>
            </div>
            <div className="tags-line">
              <span className="badge level">{skill.level}</span>
              <span className="badge category">{skill.category}</span>
              <span className="badge type">{skill.type}</span>
            </div>
            <p className="description">{skill.description}</p>
            <div className="tags">
              {skill.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingSkill ? "Edit Skill" : "Add Skill"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ❌
              </button>
            </div>
            <div className="modal-content">
              <input
                type="text"
                placeholder="Skill Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option>Can Teach</option>
                <option>Want to Learn</option>
              </select>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySkills;
