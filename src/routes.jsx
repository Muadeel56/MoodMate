import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, About, Dashboard, Login, NotFound } from './pages';
import { ProtectedRoute, PageTransition } from './components';

// Route configuration
const AppRoutes = () => {
  // For demo purposes, we'll set authentication to false
  // In a real app, this would come from your auth context/state
  const isAuthenticated = false;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PageTransition><Dashboard /></PageTransition>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route for 404 */}
      <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 