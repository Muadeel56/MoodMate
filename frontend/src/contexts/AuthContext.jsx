import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Refresh token function
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('moodmate_refresh_token');
    if (!refreshToken) return null;

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('moodmate_token', data.access_token);
        return data.access_token;
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
    }
    return null;
  };

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('moodmate_token');
        const storedUser = localStorage.getItem('moodmate_user');
        
        if (token && storedUser) {
          // Verify token with backend
          const response = await fetch('http://localhost:8000/api/v1/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else if (response.status === 401) {
            // Token expired, try to refresh
            const newToken = await refreshAccessToken();
            if (newToken) {
              // Retry with new token
              const retryResponse = await fetch('http://localhost:8000/api/v1/auth/me', {
                headers: {
                  'Authorization': `Bearer ${newToken}`,
                },
              });
              if (retryResponse.ok) {
                const userData = await retryResponse.json();
                setUser(userData);
              } else {
                // Refresh failed, clear storage
                localStorage.removeItem('moodmate_user');
                localStorage.removeItem('moodmate_token');
                localStorage.removeItem('moodmate_refresh_token');
              }
            } else {
              // No refresh token, clear storage
              localStorage.removeItem('moodmate_user');
              localStorage.removeItem('moodmate_token');
              localStorage.removeItem('moodmate_refresh_token');
            }
          }
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        localStorage.removeItem('moodmate_user');
        localStorage.removeItem('moodmate_token');
        localStorage.removeItem('moodmate_refresh_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store tokens and user data
      localStorage.setItem('moodmate_token', data.access_token);
      localStorage.setItem('moodmate_refresh_token', data.refresh_token);
      localStorage.setItem('moodmate_user', JSON.stringify(data.user));
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      // Store tokens and user data
      localStorage.setItem('moodmate_token', data.access_token);
      localStorage.setItem('moodmate_refresh_token', data.refresh_token);
      localStorage.setItem('moodmate_user', JSON.stringify(data.user));
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    const refreshToken = localStorage.getItem('moodmate_refresh_token');
    
    // Revoke refresh token on backend
    if (refreshToken) {
      try {
        await fetch('http://localhost:8000/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (err) {
        console.error('Error during logout:', err);
      }
    }
    
    // Clear all tokens and user data
    localStorage.removeItem('moodmate_user');
    localStorage.removeItem('moodmate_token');
    localStorage.removeItem('moodmate_refresh_token');
    setUser(null);
    setError(null);
    navigate('/');
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('moodmate_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 