import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  // Feature details
  const featureDetails = {
    "Connect with Learners":
      "Easily connect with people who share your interests and want to learn or teach skills together.",
    "Smart Matching":
      "Our smart algorithm pairs you with people who complement your skills and learning goals.",
    "Built-in Communication":
      "Chat directly within the platform to collaborate and exchange ideas without external apps.",
    "Skill Management":
      "Keep track of the skills you are learning and teaching, all in one place.",
    "Request System":
      "Send and receive requests to swap skills with others, making learning interactive and engaging.",
    "Rating System":
      "Rate your partners after each exchange to build trust and ensure quality learning experiences.",
  };

  // Team members data
  const teamMembers = [
    {
      name: "Subhashini",
      role: "Student",
      img: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
      description:
        "Focused on building user-friendly interfaces and improving the overall user experience.",
    },
    {
      name: "Shameem",
      role: "Student",
      img: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
      description:
        "Passionate about backend systems and ensuring smooth functionality of the platform.",
    },
    {
      name: "Asha",
      role: "Student",
      img: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
      description:
        "Contributes to research and innovative features that enhance learning through technology.",
    },
  ];

  // Values details
  const valueDetails = {
    "📚 Inclusive Learning":
      "We believe education should be accessible to everyone, regardless of background or resources.",
    "🤝 Community First":
      "We prioritize collaboration, mutual respect, and building a supportive learning community.",
    "✅ Quality & Trust":
      "We ensure skill exchanges maintain high standards and foster trust between learners and teachers.",
  };

  // Intersection animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const hiddenElements = document.querySelectorAll(".reveal");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="about-container">
      {/* Platform Features */}
      <section className="features reveal">
        <h2>Platform Features</h2>
        <p>Click a feature to know more about it!</p>
        <div className="feature-grid">
          {Object.keys(featureDetails).map((feature, index) => (
            <div
              key={feature}
              className={`feature-card delay-${index + 1} reveal`}
              onClick={() => setSelectedFeature(feature)}
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* Feature modal */}
      {selectedFeature && (
        <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedFeature}</h3>
            <p>{featureDetails[selectedFeature]}</p>
            <button onClick={() => setSelectedFeature(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Meet Our Team */}
      <section className="team reveal">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`team-member delay-${index + 1} reveal`}
              onClick={() => setSelectedMember(member)}
            >
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team member modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedMember.img}
              alt={selectedMember.name}
              style={{ width: "80px", marginBottom: "10px" }}
            />
            <h3>{selectedMember.name}</h3>
            <p><strong>{selectedMember.role}</strong></p>
            <p>{selectedMember.description}</p>
            <button onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Our Values */}
      <section className="values reveal">
        <h2>Our Values</h2>
        <p>Click on a value to learn more about our mission!</p>
        <div className="value-list">
          {Object.keys(valueDetails).map((value, index) => (
            <div
              key={value}
              className={`value-card delay-${index + 1} reveal`}
              onClick={() => setSelectedValue(value)}
            >
              {value}
            </div>
          ))}
        </div>
      </section>

      {/* Value modal */}
      {selectedValue && (
        <div className="modal-overlay" onClick={() => setSelectedValue(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedValue}</h3>
            <p>{valueDetails[selectedValue]}</p>
            <button onClick={() => setSelectedValue(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <footer className="footer reveal">
        <h3>Ready to Start Skill Swapping?</h3>
        <p>
          Join thousands of learners and teachers who are already transforming
          their lives through skill sharing.
        </p>
        <button className="cta-btn" onClick={handleGetStarted}>
          Get Started Today
        </button>
      </footer>
    </div>
  );
};

export default About;
