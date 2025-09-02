import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, About, Dashboard, Login, Register, NotFound, ResetPassword } from './pages';
import { ProtectedRoute, PageTransition } from './components';
import { useAuth } from './contexts';

// Route configuration
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
      <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
      
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