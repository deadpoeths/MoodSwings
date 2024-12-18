import React from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import './Graph.css';

function Graphs() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <div className="card-container">
          <Card
            title="Mood Graphs"
            content="Analyze your mood trends with interactive graphs and visual representations of your emotions."
          />
        </div>
      </div>
    </div>
  );
}

export default Graphs;
