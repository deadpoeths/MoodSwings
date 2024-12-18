import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

  return (
    <div class="maintext">
      <h2>Welcome to MoodSwings</h2>
      <p>Your ride or die through all the highs and lows of life!</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Welcome;
