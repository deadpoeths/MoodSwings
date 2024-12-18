import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 

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
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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

  return (
    <div class="maintext">
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
  );
}

export default SignUp;