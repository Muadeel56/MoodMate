import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts';
import { themeClasses } from '../styles/theme';
import { SocialLogin, ForgotPassword } from '../components';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: authError, clearError } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  // Clear auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth
      console.log('Google login clicked');
    } catch (err) {
      console.error('Google login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement GitHub OAuth
      console.log('GitHub login clicked');
    } catch (err) {
      console.error('GitHub login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    try {
      // TODO: Implement forgot password API call
      console.log('Forgot password for:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      throw new Error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="py-16">
          <div className="max-w-md mx-auto">
            <ForgotPassword
              onSubmit={handleForgotPassword}
              onCancel={() => setShowForgotPassword(false)}
              isLoading={isLoading}
            />
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
            Welcome Back
          </h1>
          
          <div className={`p-8 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            {authError && (
              <div className={`mb-4 p-3 rounded-md bg-red-100 border border-red-400 text-red-700 ${themeClasses.transitions.theme}`}>
                {authError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.transitions.theme} ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}
                >
                  Password
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
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className={`text-sm text-blue-500 hover:text-blue-600 underline ${themeClasses.transitions.theme}`}
                >
                  Forgot your password?
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md ${themeClasses.backgrounds.accent} ${themeClasses.text.onAccent} font-medium hover:opacity-90 disabled:opacity-50 transition-opacity ${themeClasses.transitions.theme}`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <SocialLogin 
              onGoogleLogin={handleGoogleLogin}
              onGithubLogin={handleGithubLogin}
              isLoading={isLoading}
            />
            
            <div className="mt-6 text-center">
              <p className={`text-sm ${themeClasses.text.secondary} ${themeClasses.transitions.theme}`}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className={`text-blue-500 hover:text-blue-600 underline ${themeClasses.transitions.theme}`}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login; 