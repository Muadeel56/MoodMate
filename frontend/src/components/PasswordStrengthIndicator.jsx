import React from 'react';
import { themeClasses } from '../styles/theme';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Include special character');

    return { score, feedback };
  };

  const { score, feedback } = calculateStrength(password);
  
  const getStrengthLabel = (score) => {
    if (score <= 1) return { label: 'Very Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score <= 2) return { label: 'Weak', color: 'text-orange-500', bgColor: 'bg-orange-500' };
    if (score <= 3) return { label: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (score <= 4) return { label: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    return { label: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
  };

  const { label, color, bgColor } = getStrengthLabel(score);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${color} ${themeClasses.transitions.theme}`}>
          Password Strength: {label}
        </span>
        <span className="text-xs text-gray-500">{`${score}/5`}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${bgColor}`}
          style={{ width: `${(score / 5) * 100}%` }}
        ></div>
      </div>
      
      {feedback.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-600 mb-1">To improve your password:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {feedback.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator; 