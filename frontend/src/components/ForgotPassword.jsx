import React, { useState } from 'react';
import { themeClasses } from '../styles/theme';

const ForgotPassword = ({ onSubmit, onCancel, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);

    if (!email) {
      console.log('Setting error: Email is required');
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      console.log('Setting error: Please enter a valid email address');
      setError('Please enter a valid email address');
      return;
    }

    // Clear any previous errors if validation passes
    setError('');

    try {
      await onSubmit(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  if (success) {
    return (
      <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`text-lg font-medium ${themeClasses.text.primary} mb-2`}>
            Check your email
          </h3>
          <p className={`text-sm ${themeClasses.text.secondary} mb-4`}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <button
            onClick={onCancel}
            className={`text-sm text-blue-500 hover:text-blue-600 underline ${themeClasses.transitions.theme}`}
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
      <div className="text-center mb-6">
        <h3 className={`text-lg font-medium ${themeClasses.text.primary} mb-2`}>
          Reset your password
        </h3>
        <p className={`text-sm ${themeClasses.text.secondary}`}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-400 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="reset-email" 
            className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}
          >
            Email address
          </label>
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.transitions.theme}`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={`flex-1 py-2 px-4 border border-gray-300 rounded-md ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${themeClasses.transitions.theme}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-2 px-4 rounded-md ${themeClasses.backgrounds.accent} ${themeClasses.text.onAccent} font-medium hover:opacity-90 disabled:opacity-50 transition-opacity ${themeClasses.transitions.theme}`}
          >
            {isLoading ? 'Sending...' : 'Send reset link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword; 