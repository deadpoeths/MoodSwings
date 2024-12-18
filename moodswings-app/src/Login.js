import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');

    const loginData = { username, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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

  return (
    <div class="maintext">
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
  );
}

export default Login;