import React, { useState, useEffect } from 'react';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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


function SignUp() {
  useEffect(() => {
    document.body.classList.add('signup');
    return () => {
      document.body.classList.remove('signup');
    };
  }, []);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    const userData = { username, email, password };

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Signup Response:', data);

      if (data.message === 'User registered successfully!') {
        setMessage('Account created successfully! You can now log in.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error during sign-up. Please try again.');
      console.error('Error during sign-up:', error);
    }
  };

  const moodIcons = [
    <Happy />, <Sad />, <Angry />, <Joy />, <Stressed />, <Content />,
    <Annoyed />, <Cheeky />, <Fear />, <Irritated />, <Love />, <Disgust />,
    <Tired />, <Excited />, <Surprise />
  ];

  return (
    <div class="maintext">
      <div className="icon-ring">
        {moodIcons.map((mood, index) => (
          <div
            key={index}
            className="icon-wrapper"
            style={{
              transform: `rotate(${index * 24}deg) translate(240px)`, // Increased the translation for larger ring
              position: 'absolute', // Ensure the icons are placed in a circle
            }}
          >
            <div className="icon-container">
              {mood}
            </div>
          </div>
        ))}
        <div className="icon-text">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label>Username:</label>
              <div className="input-container">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <div className="input-container">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div className="input-container">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <div className="input-container">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>{message}</p>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;