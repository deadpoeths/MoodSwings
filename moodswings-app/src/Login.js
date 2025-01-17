import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
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

function Login() {
  useEffect(() => {
    document.body.classList.add('login');
    return () => {
      document.body.classList.remove('login');
    };
  }, []);

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL; // Define apiUrl here

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');

    const loginData = { username, password };

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, { // Use apiUrl here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Login Response:', data);

      if (data.message === 'Login successful') {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setMessage(data.message || 'Invalid username or password.');
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.');
      console.error('Error during login:', error);
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
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
