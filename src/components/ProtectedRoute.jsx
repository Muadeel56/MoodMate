import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { themeClasses } from '../styles/theme';

function ProtectedRoute({ children, isAuthenticated = false }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  return children;
}

export default ProtectedRoute; 