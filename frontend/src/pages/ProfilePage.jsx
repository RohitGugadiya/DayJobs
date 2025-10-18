import React, { useState } from "react";
import { useAuthStore } from "../store/userAuthStore";
import "../CSS/ProfilePage.css";
import { useNavigate } from "react-router-dom"; 


const dummyStats = {
  gigsCompleted: 15,
  totalEarnings: 1250,
  averageRating: 4.8,
};

const dummyActivity = [
  { id: 1, title: "Event Setup Crew", date: "2025-10-01", status: "Completed" },
  { id: 2, title: "Warehouse Inventory", date: "2025-10-15", status: "Upcoming" },
  { id: 3, title: "IT Helpdesk Shift", date: "2025-09-28", status: "Completed" },
];

function ProfilePage() {

  const { user, logout } = useAuthStore(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activity");

  
  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "guest@kickon.com";
  const userAvatar = user?.avatarUrl || "https://i.pravatar.cc/150?img=68"; 


  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const renderContent = () => {
    if (activeTab === "activity") {
      return (
        <div className="profile-activity-list">
          <h3>Recent & Upcoming Gigs</h3>
          {dummyActivity.map(item => (
            <div key={item.id} className={`activity-item ${item.status.toLowerCase()}`}>
              <div className="activity-details">
                <p className="activity-title">{item.title}</p>
                <p className="activity-date">{new Date(item.date).toDateString()}</p>
              </div>
              <span className={`activity-status status-${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "settings") {
      return (
        <div className="profile-settings">
          <h3>Account Settings</h3>
          <form className="settings-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" defaultValue={userName} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={userEmail} disabled />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="********" />
            </div>
            <button className="btn-save-settings">Save Changes</button>
          </form>


          <div className="settings-logout-section">
            <button 
              className="btn-logout" 
              onClick={handleLogout}
            >
              Log Out 🚪
            </button>
          </div>


        </div>
      );
    }
  };

  return (
    <div className="profile-page-container">
      
    
      <div className="profile-header-card">
        <img src={userAvatar} alt={userName} className="profile-avatar" />
        <div className="profile-info">
          <h1>{userName}</h1>
          <p className="user-email">{userEmail}</p>
          <button className="btn-edit-profile">Edit Profile</button>
        </div>

      </div>

      
      <div className="profile-stats-grid">
        <div className="stat-card stat-completed">
          <span className="stat-number">{dummyStats.gigsCompleted}</span>
          <p>Gigs Completed</p>
        </div>
        <div className="stat-card stat-earnings">
          <span className="stat-number">${dummyStats.totalEarnings}</span>
          <p>Total Earnings</p>
        </div>
        <div className="stat-card stat-rating">
          <span className="stat-number">{dummyStats.averageRating} ★</span>
          <p>Avg Rating</p>
        </div>
      </div>

      
      <div className="profile-main-content">
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        <div className="tab-content-area">
          {renderContent()}
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;