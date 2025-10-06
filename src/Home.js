import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Learn, Teach & <span className="highlight">Grow Together</span>
          </h1>
          <p>
            SkillSwap connects learners and teachers worldwide. Share your knowledge, 
            acquire new skills, and be part of a thriving community.
          </p>
        </div>
      </section>

      {/* Why SkillSwap Section */}
      <section className="why-skillswap">
        <h2>Why SkillSwap?</h2>
        <div className="cards">
          <div className="card">
            <div className="icon">📚</div>
            <h3>New Skills</h3>
            <p>
              Learn programming, design, languages, and more from experienced mentors.
            </p>
          </div>
          <div className="card">
            <div className="icon">💡</div>
            <h3>Knowledge Sharing</h3>
            <p>
              Teach what you know and help others grow while gaining recognition.
            </p>
          </div>
          <div className="card">
            <div className="icon">🤝</div>
            <h3>Community Driven</h3>
            <p>
              Connect with learners and mentors globally, collaborate, and share ideas.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">📝</div>
            <h3>1. Sign Up</h3>
            <p>Create your free profile and set your skills to teach or learn.</p>
          </div>
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>2. Explore Skills</h3>
            <p>Browse skills, find mentors, and choose what you want to learn.</p>
          </div>
          <div className="step">
            <div className="step-icon">🚀</div>
            <h3>3. Connect & Learn</h3>
            <p>Start learning, share knowledge, and grow together with the community.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Start Learning?</h2>
        <div className="cta-buttons">
          <button className="btn secondary" onClick={() => navigate("/about")}>
            Learn More
          </button>
          <button className="btn primary" onClick={() => navigate("/profile")}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

