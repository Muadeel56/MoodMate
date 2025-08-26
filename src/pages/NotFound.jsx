import React from 'react';
import { Link } from 'react-router-dom';
import { themeClasses } from '../styles/theme';

function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className={`text-6xl font-bold ${themeClasses.text.primary} mb-4 ${themeClasses.transitions.theme}`}>
            404
          </h1>
          <h2 className={`text-3xl font-semibold ${themeClasses.text.primary} mb-6 ${themeClasses.transitions.theme}`}>
            Page Not Found
          </h2>
          <p className={`text-lg ${themeClasses.text.secondary} mb-8 ${themeClasses.transitions.theme}`}>
            Oops! The page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className={`inline-block px-6 py-3 rounded-lg ${themeClasses.backgrounds.accent} ${themeClasses.text.onAccent} font-medium hover:opacity-90 transition-opacity ${themeClasses.transitions.theme}`}
            >
              Go Home
            </Link>
            
            <div className="text-sm">
              <p className={`${themeClasses.text.secondary} ${themeClasses.transitions.theme}`}>
                Or try one of these pages:
              </p>
              <div className="mt-2 space-x-4">
                <Link 
                  to="/about" 
                  className={`text-blue-500 hover:text-blue-600 underline ${themeClasses.transitions.theme}`}
                >
                  About
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`text-blue-500 hover:text-blue-600 underline ${themeClasses.transitions.theme}`}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound; 