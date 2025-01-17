import React, { useEffect, useState } from "react";
import { ReactComponent as Happy } from './svgs/happy.svg';
import { ReactComponent as Sad } from './svgs/sad.svg';
import { ReactComponent as Angry } from './svgs/angry.svg';
import { ReactComponent as Joy } from './svgs/joy.svg';
import { ReactComponent as Stressed } from './svgs/stressed.svg';
import { ReactComponent as Content } from './svgs/content.svg';
import { ReactComponent as Annoyed } from './svgs/annoyed.svg';
import { ReactComponent as Cheeky } from './svgs/cheeky.svg';
import { ReactComponent as Fear } from './svgs/fear.svg';
import { ReactComponent as Irritated } from './svgs/irritated.svg';
import { ReactComponent as Love } from './svgs/love.svg';
import { ReactComponent as Disgust } from './svgs/disgust.svg';
import { ReactComponent as Tired } from './svgs/tired.svg';
import { ReactComponent as Excited } from './svgs/excited.svg';
import { ReactComponent as Surprise } from './svgs/surprise.svg';

import Sidebar from "./Sidebar";
import "./Home.css";

// Mapping of mood IDs to labels, components, and colors
const moodMapping = [
  { id: 1, label: "Happy", Component: Happy, color: "#FDE986" },
  { id: 2, label: "Sad", Component: Sad, color: "#8BB2F1" },
  { id: 3, label: "Angry", Component: Angry, color: "#FD8584" },
  { id: 4, label: "Joyful", Component: Joy, color: "#DB9AED" },
  { id: 5, label: "Stressed", Component: Stressed, color: "#D6E6F6" },
  { id: 6, label: "Content", Component: Content, color: "#FFD4D4" },
  { id: 7, label: "Annoyed", Component: Annoyed, color: "#D9D9D9" },
  { id: 8, label: "Cheeky", Component: Cheeky, color: "#AE80EE" },
  { id: 9, label: "Fearful", Component: Fear, color: "#FF985D" },
  { id: 10, label: "Irritated", Component: Irritated, color: "#305F72" },
  { id: 11, label: "Loving", Component: Love, color: "#86D3FD" },
  { id: 12, label: "Disgusted", Component: Disgust, color: "#92FD86" },
  { id: 13, label: "Tired", Component: Tired, color: "#FFC085" },
  { id: 14, label: "Excited", Component: Excited, color: "#FFD4D4" },
  { id: 15, label: "Surprised", Component: Surprise, color: "#FFE372" }
];

const moodIcons = moodMapping.reduce((acc, { id, Component, color }) => {
  acc[id] = { icon: <Component />, color };
  return acc;
}, {});

const Home = () => {
  const [totalDaysLogged, setTotalDaysLogged] = useState(0);
  const [topMoods, setTopMoods] = useState([]);
  const [motivationMessage, setMotivationMessage] = useState(''); // message state

  useEffect(() => {
    const motivationalMessages = [
      'Keep it up!',
      'You’re on a roll!',
      'And that’s on self-reflection!',
      'You’re doing great, take it one day at a time!',
      'Emotions are valid, keep tracking your journey!',
      'It’s okay to have ups and downs. You’re doing amazing!',
      'Embrace your emotions, they’re part of your growth!',
      'Feelings are temporary, but your strength is forever!',
      'You’re allowed to have bad days. Keep going!',
      'Every mood logged is a step closer to understanding yourself better!',
      'Your feelings matter, keep reflecting and growing!',
      'You’re making progress, even on the tough days!',
      'It’s okay to not be okay sometimes. You’re still doing great!',
      'Remember, it’s about progress, not perfection!',
      'Your emotional journey is unique, and you’re doing wonderfully!',
      'Self-awareness is the first step to emotional well-being. Keep it up!',
      'You’re not alone in this. Your journey is important!',
      'Be kind to yourself, every mood is part of your story!',
      'Growth comes from understanding your emotions. You’ve got this!',
      'It’s okay to take a break, your mental health matters!'
    ];

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    // Fetch mood data for the home page
    fetch(`${process.env.REACT_APP_API_URL}api/moods`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Extract unique dates from timestamps
          const uniqueDates = new Set(data.map((item) => new Date(item.timestamp).toDateString()));
          setTotalDaysLogged(uniqueDates.size);

          // Set rotating motivational message
          const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
          setMotivationMessage(randomMessage);

          const updatedTopMoods = data
            .reduce((acc, item) => {
              item.moods.forEach((mood) => {
                acc[mood] = (acc[mood] || 0) + 1;
              });
              return acc;
            }, {});

          const sortedMoods = Object.entries(updatedTopMoods)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([mood, count]) => {
              const { icon, color } = moodIcons[mood] || {}; // Ensure valid mood
              return {
                moodLabel: moodMapping.find((item) => item.id === parseInt(mood))?.label,
                icon,
                color,
                count,
              };
            });

          setTopMoods(sortedMoods);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((err) => console.error('Error fetching mood data:', err));
  }, []); // motivationalMessages no longer in dependencies

  return (
    <div className="app">
      <Sidebar />
      <div className="home-content">
        <div className="home-container">
          <div className="welcome-message">
            <h2>Hi, welcome to MoodSwings!</h2>
            <p>A cozy space on the internet for you to self-reflect and emotionally regulate your moods!</p>
          </div>

          {/* Icon ring with total days logged */}
          <div className="icon-ring-home">
            {moodMapping.map((mood, index) => (
              <div
                key={mood.id}
                className="icon-wrapper-home"
                style={{
                  transform: `rotate(${index * 24}deg) translate(100px)`
                }}
              >
                <div className="icon-container-home">
                  {moodIcons[mood.id]?.icon}
                </div>
              </div>
            ))}
            <div className="icon-text-home">
              <span>{`${totalDaysLogged} Days / 365`}</span>
              <br />
              <span>{motivationMessage}</span>
            </div>
          </div>

          <div className="bar-chart">
            {topMoods.map(({ moodLabel, icon, color, count }, index) => (
              <div className="bar-container" key={index}>
                <div className="bar"
                  style={{
                    width: `${Math.max(count * 10, 10)}%`,
                    backgroundColor: color
                  }}></div>
                <div className="bar-label">
                  {icon ? icon : <div className="default-icon">❓</div>}
                  <div>{moodLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
