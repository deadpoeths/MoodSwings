import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
/*import Dashboard from "./Dashboard";*/
import LogMoods from "./Logmoods";
import History from "./History";
import Graphs from "./Graph";
import Settings from "./Settings";
/*import Sidebar from "./Sidebar";*/

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          {/*<Route path="/dashboard" element={<Dashboard />} />*/}
          <Route path="/log-moods" element={<LogMoods />} />
          <Route path="/history" element={<History />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;