import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar';
import './Graph.css';

// Mood label mappings (same as in History.js)
const moodLabels = {
  1: 'Happy',
  2: 'Sad',
  3: 'Angry',
  4: 'Joyful',
  5: 'Stressed',
  6: 'Content',
  7: 'Annoyed',
  8: 'Cheeky',
  9: 'Fearful',
  10: 'Irritated',
  11: 'Loving',
  12: 'Disgusted',
  13: 'Tired',
  14: 'Excited',
  15: 'Surprised',
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graph() {
  const [moodData, setMoodData] = useState([]);
  const [graphData, setGraphData] = useState({});

  // Fetch mood entries from the API
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    fetch('http://localhost:5000/api/moods', {
      headers: {
        'Authorization': `Bearer ${token}` // Add the token to the Authorization header
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const parsedData = data.map((item) => ({
            ...item,
            moods: item.moods || [] // Ensure moods is an array
          }));
          setMoodData(parsedData);
          processGraphData(parsedData);
        } else {
          console.error('Unexpected data format:', data);
          setMoodData([]); // Set to empty if data format is unexpected
        }
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Process data into mood count for the graph
  const processGraphData = (data) => {
    const moodCounts = new Array(15).fill(0); // Array to store mood counts for each mood (1 to 15)

    data.forEach((entry) => {
      entry.moods.forEach((moodId) => {
        moodCounts[moodId - 1] += 1; // Increment the count for the specific mood
      });
    });

    const graphLabels = Object.values(moodLabels); // Get the mood labels
    setGraphData({
      labels: graphLabels,
      datasets: [{
        label: 'Mood Count',
        data: moodCounts, // Count of each mood
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      }]
    });
  };

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
