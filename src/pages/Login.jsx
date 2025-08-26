import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { themeClasses } from '../styles/theme';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we'll just navigate to the dashboard
      // In a real app, you'd validate credentials and set auth state
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16">
        <div className="max-w-md mx-auto">
          <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-6 text-center ${themeClasses.transitions.theme}`}>
            Welcome Back
          </h1>
          
          <div className={`p-8 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
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
                  required
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.transitions.theme}`}
                  placeholder="Enter your email"
                />
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
                  required
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.transitions.theme}`}
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md ${themeClasses.backgrounds.accent} ${themeClasses.text.onAccent} font-medium hover:opacity-90 disabled:opacity-50 transition-opacity ${themeClasses.transitions.theme}`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
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