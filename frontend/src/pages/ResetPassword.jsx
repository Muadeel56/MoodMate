import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts';
import { themeClasses } from '../styles/theme';
import { PasswordStrengthIndicator } from '../components';

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearError } = useAuth();

  const token = searchParams.get('token');

  // Clear auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          new_password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setErrors({ general: data.detail || 'Failed to reset password' });
      }
    } catch (err) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="py-16">
          <div className="max-w-md mx-auto">
            <div className={`p-8 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-2`}>
                  Password Reset Successful!
                </h2>
                <p className={`${themeClasses.text.secondary} mb-4`}>
                  Your password has been reset successfully. You will be redirected to the login page shortly.
                </p>
                <Link 
                  to="/login"
                  className={`inline-block px-4 py-2 rounded-md ${themeClasses.backgrounds.accent} ${themeClasses.text.onAccent} font-medium hover:opacity-90 transition-opacity`}
                >
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16">
        <div className="max-w-md mx-auto">
          <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-6 text-center ${themeClasses.transitions.theme}`}>
            Reset Your Password
          </h1>
          
          <div className={`p-8 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            {errors.general && (
              <div className={`mb-4 p-3 rounded-md bg-red-100 border border-red-400 text-red-700 ${themeClasses.transitions.theme}`}>
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.transitions.theme} ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your new password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <PasswordStrengthIndicator password={formData.password} />
              </div>
              
              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.transitions.theme} ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Confirm your new password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md ${themeClasses.backgrounds.accent} ${themeClasses.text.onAccent} font-medium hover:opacity-90 disabled:opacity-50 transition-opacity ${themeClasses.transitions.theme}`}
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className={`text-sm ${themeClasses.text.secondary} ${themeClasses.transitions.theme}`}>
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className={`text-blue-500 hover:text-blue-600 underline ${themeClasses.transitions.theme}`}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResetPassword; 