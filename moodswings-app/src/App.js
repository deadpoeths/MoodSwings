import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import LogMoods from "./Logmoods";
import History from "./History";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/log-moods" element={<LogMoods />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;