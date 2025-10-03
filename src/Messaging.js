import React, { useState, useEffect, useRef } from "react";
import "./Messaging.css";

const initialConversations = [
  {
    id: 1,
    name: "Alex Chen",
    message: "Hi! I saw your JavaScript skills and would love to learn from you!",
    time: "16:00",
    status: "online",
    avatar: "https://i.pravatar.cc/40?img=10",
    unread: 2,
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    message: "I’m particularly interested in React hooks and state management.",
    time: "16:45",
    status: "last seen 5m ago",
    avatar: "https://i.pravatar.cc/40?img=12",
    unread: 0,
  },
];

export default function Messaging() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedChat, setSelectedChat] = useState(initialConversations[0]);
  const [messages, setMessages] = useState([
    {
      sender: "other",
      text: "Hi! I saw your JavaScript skills and would love to learn from you!",
      time: "16:00",
      seen: true,
    },
    {
      sender: "other",
      text: "I’m particularly interested in React hooks and state management.",
      time: "16:45",
      seen: true,
    },
    {
      sender: "me",
      text: "Absolutely! I'd be happy to help. What specific areas are you interested in?",
      time: "16:50",
      seen: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        sender: "me",
        text: newMessage,
        time: "Now",
        seen: false,
      };

      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");

      // update sidebar preview
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedChat.id
            ? { ...c, message: newMessage, time: "Now", unread: 0 }
            : c
        )
      );

      // simulate typing + reply
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        const reply = {
          sender: "other",
          text: "Got it! That makes sense.",
          time: "Now",
          seen: true,
        };
        setMessages((prev) => [...prev, reply]);
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedChat.id
              ? { ...c, message: reply.text, time: "Now" }
              : c
          )
        );
      }, 3000);
    }
  };

  const handleSelectChat = (conv) => {
    setSelectedChat(conv);

    // reset unread
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
    );

    // mark my messages as seen
    setMessages((prev) =>
      prev.map((m) => (m.sender === "me" ? { ...m, seen: true } : m))
    );

    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <div className="messaging-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <input type="text" placeholder="Search conversations..." className="search-input" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✖</button>
        </div>
        <div className="conversations">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation ${selectedChat.id === conv.id ? "active" : ""}`}
              onClick={() => handleSelectChat(conv)}
            >
              <img src={conv.avatar} alt={conv.name} className="avatar" />
              <div className="conversation-info">
                <p className="name">{conv.name}</p>
                <p className="last-message">
                  {conv.id === selectedChat.id && typing ? "typing..." : conv.message}
                </p>
              </div>
              <div className="conversation-meta">
                <span className="time">{conv.time}</span>
                {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <button className="open-sidebar-btn" onClick={() => setSidebarOpen(true)}>☰</button>

        {/* 🔥 Chat Header with Call + Video Call */}
        <div className="chat-header">
          <div className="chat-header-left">
            <img src={selectedChat.avatar} alt={selectedChat.name} className="chat-header-avatar" />
            <div className="chat-header-info">
              <p className="chat-header-name">{selectedChat.name}</p>
              <p className="chat-header-status">{selectedChat.status}</p>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="header-btn">📞</button>
            <button className="header-btn">🎥</button>
          </div>
        </div>

        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
              <span className="time">
                {msg.time}{" "}
                {msg.sender === "me" &&
                  (msg.seen ? (
                    <span className="seen-icon">✓✓</span>
                  ) : (
                    <span className="sent-icon">✓</span>
                  ))}
              </span>
            </div>
          ))}
          {typing && (
            <div className="message other typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
}
