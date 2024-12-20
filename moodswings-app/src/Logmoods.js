import React, { useState, useEffect } from "react";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog, FaWind } from "react-icons/fa";
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
import "./Logmoods.css";

const LogMoods = () => {
  const [entry, setEntry] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({ entry: "", emojis: "", weather: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }
    fetch("/api/moods", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching entries:", error));
  }, []);

  const validateForm = () => {
    let hasError = false;
    const newErrors = { entry: "", emojis: "", weather: "" };

    if (!entry.trim()) {
      newErrors.entry = "Please enter a journal entry.";
      hasError = true;
    }
    if (selectedEmojis.length === 0) {
      newErrors.emojis = "Please select at least one mood.";
      hasError = true;
    }
    if (!selectedWeather) {
      newErrors.weather = "Please select the weather.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const addEntry = () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available.");
      return;
    }

    const timestamp = new Date();

    fetch("http://localhost:5000/api/moods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ entry, moods: selectedEmojis, weather: selectedWeather, timestamp }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Server error:", response.status);
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error("Error response from server:", data.error);
        } else {
          setEntry("");
          setSelectedEmojis([]);
          setSelectedWeather(null);
          setErrors({ entry: "", emojis: "", weather: "" });
          setShowPopup(true);
        }
      })
      .catch((error) => {
        console.error("Error adding entry:", error);
      });
  };

  const handleEmojiClick = (emojiId) => {
    setSelectedEmojis((prev) =>
      prev.includes(emojiId) ? prev.filter((id) => id !== emojiId) : [...prev, emojiId]
    );
  };

  const handleWeatherClick = (weatherType) => {
    setSelectedWeather(weatherType);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const weatherOptions = [
    { id: 1, Icon: FaSun, label: "Sunny" },
    { id: 2, Icon: FaCloud, label: "Cloudy" },
    { id: 3, Icon: FaCloudRain, label: "Rainy" },
    { id: 4, Icon: FaSnowflake, label: "Snowy" },
    { id: 5, Icon: FaSmog, label: "Foggy" },
    { id: 6, Icon: FaWind, label: "Windy" },
  ];

  const emojiList = [
    { id: 1, Component: Happy, label: "Happy" },
    { id: 2, Component: Sad, label: "Sad" },
    { id: 3, Component: Angry, label: "Angry" },
    { id: 4, Component: Joy, label: "Joyful" },
    { id: 5, Component: Stressed, label: "Stressed" },
    { id: 6, Component: Content, label: "Content" },
    { id: 7, Component: Annoyed, label: "Annoyed" },
    { id: 8, Component: Cheeky, label: "Cheeky" },
    { id: 9, Component: Fear, label: "Fearful" },
    { id: 10, Component: Irritated, label: "Irritated" },
    { id: 11, Component: Love, label: "Loving" },
    { id: 12, Component: Disgust, label: "Disgusted" },
    { id: 13, Component: Tired, label: "Tired" },
    { id: 14, Component: Excited, label: "Excited" },
    { id: 15, Component: Surprise, label: "Surprised" },
  ];

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <div className="card">
          {/* Today's Mood Section */}
          <div className="section">
            <h2 className="card-title">Today's Mood</h2>
            <div className="emoji-container">
              {emojiList.map(({ id, Component, label }) => (
                <div key={id} className="emoji-wrapper">
                  <Component
                    className={`emoji ${selectedEmojis.includes(id) ? "selected" : ""}`}
                    onClick={() => handleEmojiClick(id)}
                  />
                  <p className="emoji-label">{label}</p>
                </div>
              ))}
            </div>
            {errors.emojis && <p className="error-message">{errors.emojis}</p>}
          </div>

          {/* Weather Section */}
          <div className="section">
            <h2 className="card-title">Weather</h2>
            <div className="weather-container">
              {weatherOptions.map(({ id, Icon, label }) => (
                <div key={id} className="weather-wrapper" onClick={() => handleWeatherClick(id)}>
                  <Icon
                    className={`weather-icon ${selectedWeather === id ? "selected" : ""}`}
                  />
                  <p className="weather-label">{label}</p>
                </div>
              ))}
            </div>
            {errors.weather && <p className="error-message">{errors.weather}</p>}
          </div>

          {/* Personal Journal Section */}
          <div className="section">
            <h2 className="card-title">Personal Journal</h2>
            <textarea
              className={`textarea ${errors.entry ? "error-border" : ""}`}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="What made you feel this way?..."
            />
            {errors.entry && <p className="error-message">{errors.entry}</p>}
            <button onClick={addEntry} className="button">
              Submit
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="popup">
            <span className="popup-close" onClick={closePopup}>
              &times;
            </span>
            <p>Successfully logged in today's mood and weather!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogMoods;
