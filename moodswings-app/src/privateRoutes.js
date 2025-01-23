import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Or from cookies/sessionStorage
    setIsAuthenticated(!!token); // If there's a token, user is authenticated
  }, []);

  if (isAuthenticated === null) {
    // If authentication status is still being determined
    return <div>Loading...</div>; // Or a loader component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
