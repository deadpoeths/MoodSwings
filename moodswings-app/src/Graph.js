import React from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import './Graph.css';

function Graphs() {
  return (
    <div className="graph-container">
      <Sidebar />
      <div className="main-content">
        <div className="card">
          <h1 className="card-title">Mood Graph</h1>
          {graphData.labels ? (
            <Bar
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Mood Distribution',
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.raw} entries`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <p>Loading mood data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Graph;
