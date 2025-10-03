import React, { useState, useEffect } from "react";
import "./Request.css";

const Request = () => {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("incoming");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("skillSwapTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Save theme on change
  useEffect(() => {
    localStorage.setItem("skillSwapTheme", theme);
  }, [theme]);

  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 1,
      name: "Anita Rao",
      offers: "HTML & CSS",
      wants: "React Basics",
      message: "Hi! I can teach HTML/CSS in exchange for a React intro session.",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      offers: "Python (Data Analysis)",
      wants: "SQL Basics",
      message: "Would love to swap Python help for SQL practice.",
      status: "Pending",
    },
    {
      id: 3,
      name: "Radha Patel",
      offers: "UI Design",
      wants: "JavaScript Fundamentals",
      message: "I can help with UI design critique and want JS fundamentals.",
      status: "Pending",
    },
  ]);

  const [sentRequests, setSentRequests] = useState([
    {
      id: 101,
      name: "Meera Joshi",
      offers: "React Basics",
      wants: "Python Basics",
      message: "Can we swap React sessions for Python basics?",
      status: "Accepted",
    },
    {
      id: 102,
      name: "Neha Kapoor",
      offers: "Data Structures",
      wants: "UI Design",
      message: "Looking for UI design help, happy to share DSA knowledge.",
      status: "Pending",
    },
    {
      id: 103,
      name: "Riya Sharma",
      offers: "JavaScript",
      wants: "SQL Advanced",
      message: "I’d love to learn SQL advanced in return for JS support.",
      status: "Rejected",
    },
  ]);

  const handleIncomingAction = (id, action) => {
    setIncomingRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  // New request form state
  const [newRequest, setNewRequest] = useState({
    name: "",
    offers: "",
    wants: "",
    message: "",
  });

  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleNewRequestSubmit = (e) => {
    e.preventDefault();
    if (!newRequest.name || !newRequest.offers || !newRequest.wants) {
      alert("Please fill in all required fields.");
      return;
    }

    const newReq = {
      id: Date.now(),
      ...newRequest,
      status: "Pending",
    };

    setSentRequests((prev) => [...prev, newReq]);
    setNewRequest({ name: "", offers: "", wants: "", message: "" });
    setActiveTab("sent"); // switch to sent tab after creating
  };

  // Filtering function
  const filterRequests = (requests) => {
    return requests.filter((req) => {
      const matchesSearch =
        req.name.toLowerCase().includes(search.toLowerCase()) ||
        req.offers.toLowerCase().includes(search.toLowerCase()) ||
        req.wants.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || req.status === filter;

      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className={`request-container ${theme}`}>
      <header className="header">
        <h2>Skill Swap Requests</h2>
        <p>Manage your incoming and sent requests for skill swapping</p>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "incoming" ? "active" : ""}`}
          onClick={() => setActiveTab("incoming")}
        >
          📥 Incoming
        </button>
        <button
          className={`tab ${activeTab === "sent" ? "active" : ""}`}
          onClick={() => setActiveTab("sent")}
        >
          📤 Sent
        </button>
        <button
          className={`tab ${activeTab === "new" ? "active" : ""}`}
          onClick={() => setActiveTab("new")}
        >
          📝 New Request
        </button>
      </div>

      {/* Search + Filter (only for Incoming/Sent) */}
      {activeTab !== "new" && (
        <div className="controls">
          <input
            type="text"
            placeholder="🔍 Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      )}

      {/* Requests List */}
      <div className="request-list">
        {activeTab === "incoming" &&
          filterRequests(incomingRequests).map((req) => (
            <div className={`request-card ${req.status.toLowerCase()}`} key={req.id}>
              <div className="user-info">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                  alt="avatar"
                  className="avatar"
                />
                <div>
                  <h3>{req.name}</h3>
                  <p><strong>Offers:</strong> {req.offers}</p>
                  <p><strong>Wants:</strong> {req.wants}</p>
                  <p className="message">{req.message}</p>
                </div>
              </div>

              <div className="actions">
                <span className={`status ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
                {req.status === "Pending" && (
                  <>
                    <button
                      className="accept-btn"
                      onClick={() => handleIncomingAction(req.id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleIncomingAction(req.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

        {activeTab === "sent" &&
          filterRequests(sentRequests).map((req) => (
            <div className={`request-card ${req.status.toLowerCase()}`} key={req.id}>
              <div className="user-info">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                  alt="avatar"
                  className="avatar"
                />
                <div>
                  <h3>{req.name}</h3>
                  <p><strong>You Offer:</strong> {req.offers}</p>
                  <p><strong>You Want:</strong> {req.wants}</p>
                  <p className="message">{req.message}</p>
                </div>
              </div>

              <div className="actions">
                <span className={`status ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </div>
            </div>
          ))}

        {activeTab === "new" && (
          <form className="new-request-form" onSubmit={handleNewRequestSubmit}>
            <h3>Create a New Request</h3>
            <input
              type="text"
              name="name"
              placeholder="Recipient Name"
              value={newRequest.name}
              onChange={handleNewRequestChange}
              required
            />
            <input
              type="text"
              name="offers"
              placeholder="What skill can you offer?"
              value={newRequest.offers}
              onChange={handleNewRequestChange}
              required
            />
            <input
              type="text"
              name="wants"
              placeholder="What skill do you want?"
              value={newRequest.wants}
              onChange={handleNewRequestChange}
              required
            />
            <textarea
              name="message"
              placeholder="Add a message (optional)"
              value={newRequest.message}
              onChange={handleNewRequestChange}
            />
            <button type="submit" className="submit-btn">Send Request</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Request;
