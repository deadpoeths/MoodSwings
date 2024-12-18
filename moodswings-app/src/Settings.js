import React from 'react';
import Sidebar from "./Sidebar";
import Card from "./Card";
import './Settings.css';

function Settings() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <div className="card-container">
          <Card
            title="Settings"
            content="Customize your MoodSwings experience. Manage your profile, preferences, and app settings here."
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;