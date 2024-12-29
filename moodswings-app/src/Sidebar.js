import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaPencilAlt, FaCalendarAlt, FaCog } from "react-icons/fa"; // Import icons
import "./Sidebar.css";

const Sidebar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>MoodSwings</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <NavLink to="/home" activeClassName="active" className="link">
            <FaHome className="icon" /> Home
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/log-moods" activeClassName="active" className="link">
            <FaPencilAlt className="icon" /> Log Moods
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/history" activeClassName="active" className="link">
            <FaCalendarAlt className="icon" /> History
          </NavLink>
        </li>
        <li className="sidebar-item settings-btn">
          <button
            className="logout-link"
            onClick={() => setShowLogoutPopup(true)}
          >
            <FaCog className="icon" /> Logout
          </button>
        </li>
      </ul>

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>We are sad to see you leave <br/>Are you sure you want to logout?</p>
            <div className="popup-actions">
              <button className="yes-button" onClick={handleLogout}>
                Yes
              </button> 
              <button
                className="no-button"
                onClick={() => setShowLogoutPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;