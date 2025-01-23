import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import LogMoods from "./Logmoods";
import History from "./History";
import PrivateRoute from './privateRoutes'; // Import PrivateRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/log-moods" 
            element={
              <PrivateRoute>
                <LogMoods />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;
