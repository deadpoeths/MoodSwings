import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

function Welcome() {
  useEffect(() => {
    document.body.classList.add('welcome');
    return () => {
      document.body.classList.remove('welcome');
    };
  }, []);

  const navigate = useNavigate(); // Hook to navigate between routes

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleSignup = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  const moodIcons = [
    <Tired />, <Sad />, <Angry />, <Joy />, <Stressed />, <Content />,
    <Annoyed />, <Cheeky />, <Fear />, <Irritated />, <Love />, <Disgust />,
    <Excited />, <Surprise />, <Happy />
  ];

  return (
    <div className="maintext">
      <div className="icon-ring">
        {moodIcons.map((mood, index) => (
          <div
            key={index}
            className="icon-wrapper"
            style={{
              transform: `rotate(${index * 24}deg) translate(200px)`, // Increased the translation for larger ring
              position: 'absolute', // Ensure the icons are placed in a circle
            }}
          >
            <div className="icon-container">
              {mood}
            </div>
          </div>
        ))}
        <div className="icon-text">
          <h2>Welcome to MoodSwings</h2>
          <p>Your ride or die through all the highs and lows of life!</p>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
