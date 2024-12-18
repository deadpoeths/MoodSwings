import React from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import "./Home.css"; // Add custom styles for the home layout

const Home = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <h1>Home</h1>
        <div className="card-container">
          <Card
            title="Welcome"
            content="Explore your MoodSwings dashboard to log and analyze your moods."
          />
          <Card
            title="Latest Logs"
            content="You have logged 5 moods this week. Keep tracking for better insights!"
          />
          <Card
            title="Statistics"
            content="View graphs and insights on your mood patterns in the Graphs section."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;