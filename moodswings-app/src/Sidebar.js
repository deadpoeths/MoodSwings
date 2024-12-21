import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPencilAlt, FaCalendarAlt, FaChartLine, FaCog } from "react-icons/fa"; // Import icons
import "./Sidebar.css";

const Sidebar = () => {
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
        <li className="sidebar-item">
          <NavLink to="/graphs" activeClassName="active" className="link">
            <FaChartLine className="icon" /> Graph
          </NavLink>
        </li>
        <li className="sidebar-item settings-btn">
          <NavLink to="/settings" activeClassName="active" className="link">
            <FaCog className="icon" /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;