import React, { useState } from 'react';
import { useAuth } from '../contexts';
import { themeClasses } from '../styles/theme';

function ChangePassword() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const validateForm = () => {
    const newErrors = {};

    // Current password validation
    if (!formData.current_password) {
      newErrors.current_password = 'Current password is required';
    }

    // New password validation
    if (!formData.new_password) {
      newErrors.new_password = 'New password is required';
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your new password';
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('moodmate_token')}`,
        },
        body: JSON.stringify({
          current_password: formData.current_password,
          new_password: formData.new_password
        }),
      });

      if (response.ok) {
        setMessage('Password changed successfully!');
        setFormData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      } else {
        const error = await response.json();
        setMessage(error.detail || 'Failed to change password');
      }
    } catch (err) {
      setMessage('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="py-16">
          <div className="text-center">
            <p className={`text-lg ${themeClasses.text.secondary}`}>
              Please log in to change your password.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary} ${themeClasses.transitions.theme}`}>
              Change Password
            </h1>
            <p className={`text-lg ${themeClasses.text.secondary} ${themeClasses.transitions.theme}`}>
              Update your account password
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="current_password" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                  Current Password
                </label>
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme ${
                    errors.current_password ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.current_password && (
                  <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>
                )}
              </div>

              <div>
                <label htmlFor="new_password" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                  New Password
                </label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme ${
                    errors.new_password ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.new_password && (
                  <p className="mt-1 text-sm text-red-600">{errors.new_password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm_password" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme ${
                    errors.confirm_password ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.confirm_password && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirm_password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors`}
              >
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ChangePassword; 