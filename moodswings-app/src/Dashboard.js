import React from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <div className="card-container">
          <Card
            title="Mood Trends"
            content="Analyze your weekly and monthly mood trends."
          />
          <Card
            title="Daily Logs"
            content="Quick access to your recent mood logs."
          />
          <Card
            title="Insights"
            content="Discover patterns and insights based on your mood history."
          />
          <Card
            title="Actions"
            content="Set reminders to log your moods daily."
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;