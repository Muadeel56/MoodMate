import React from 'react';
import { useLocation } from 'react-router-dom';
import { themeClasses } from '../styles/theme';

function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div 
      key={location.pathname}
      className={`animate-fadeIn ${themeClasses.transitions.theme}`}
      style={{
        animation: 'fadeIn 0.3s ease-in-out'
      }}
    >
      {children}
    </div>
  );
}

export default PageTransition; 