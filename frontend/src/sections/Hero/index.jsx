import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Users, ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts';
import { themeClasses, gradients } from '../../styles/theme';

/**
 * Hero Section Component
 * Features:
 * - Compelling copy and layout
 * - Call-to-action buttons
 * - Mood-related illustrations/icons
 * - Smooth scroll animations
 * - Responsive design
 * - Gradient backgrounds
 * - Accessibility features
 * - Theme-aware styling
 */
const Hero = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMood, setCurrentMood] = useState(0);

  // Mood icons for animation
  const moodIcons = [
    { icon: Heart, color: 'text-red-500', label: 'Happy' },
    { icon: Sparkles, color: 'text-yellow-500', label: 'Excited' },
    { icon: Moon, color: 'text-blue-500', label: 'Calm' },
    { icon: Sun, color: 'text-orange-500', label: 'Energetic' },
  ];

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Rotate through mood icons
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMood((prev) => (prev + 1) % moodIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  const CurrentMoodIcon = moodIcons[currentMood].icon;

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${themeClasses.transitions.theme}`}
      role="banner"
      aria-label="MoodMate Hero Section"
    >
      {/* Theme-aware Gradient Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-100'
      }`}></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-1000 ${
          isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500 transition-all duration-1000 ${
          isDark ? 'bg-indigo-500/20' : 'bg-indigo-500/10'
        }`}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight ${themeClasses.transitions.theme} ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Track Your
            <span className="block bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              Mood Journey
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${themeClasses.transitions.theme} ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Discover patterns, understand emotions, and build better mental health habits with your personal mood tracking companion.
          </p>

          {/* Mood Icon Animation */}
          <div className="flex justify-center items-center mb-8">
            <div className="relative">
              <div className={`w-16 h-16 backdrop-blur-sm rounded-full flex items-center justify-center border transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 border-white/30' 
                  : 'bg-white/80 border-gray-200 shadow-lg'
              }`}>
                <CurrentMoodIcon 
                  className={`w-8 h-8 ${moodIcons[currentMood].color} transition-all duration-500`}
                  aria-label={`Current mood: ${moodIcons[currentMood].label}`}
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { icon: Heart, text: 'Track Daily Moods', color: 'text-red-500' },
              { icon: TrendingUp, text: 'View Patterns', color: 'text-green-500' },
              { icon: Users, text: 'Share Insights', color: 'text-blue-500' },
            ].map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 delay-${index * 200} transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className={`backdrop-blur-sm rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-white/80 border-gray-200 hover:bg-white shadow-lg'
                }`}>
                  <feature.icon className={`w-8 h-8 ${feature.color} mx-auto mb-3`} />
                  <p className={`font-medium ${themeClasses.transitions.theme} ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => scrollToSection('features')}
              className={`group ${gradients.primary} ${gradients.primaryHover} text-white font-semibold py-4 px-8 rounded-full ${themeClasses.transitions.theme} transform hover:scale-105 hover:shadow-2xl flex items-center gap-2`}
              aria-label="Get started with MoodMate"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => scrollToSection('demo')}
              className={`group font-semibold py-4 px-8 rounded-full border ${themeClasses.transitions.theme} transform hover:scale-105 flex items-center gap-2 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/30' 
                  : 'bg-white/80 hover:bg-white text-gray-800 border-gray-200 shadow-lg'
              }`}
              aria-label="Watch demo video"
            >
              Watch Demo
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                isDark ? 'bg-white' : 'bg-gray-800'
              }`}>
                <div className={`w-0 h-0 border-l-4 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5 ${
                  isDark ? 'border-l-white' : 'border-l-gray-800'
                }`}></div>
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={`text-sm ${themeClasses.transitions.theme} ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="mb-2">Trusted by 10,000+ users worldwide</p>
            <div className="flex justify-center items-center gap-4 text-xs">
              <span>🔒 Privacy First</span>
              <span>📱 Mobile Optimized</span>
              <span>⚡ Real-time Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${themeClasses.transitions.theme} ${
          isDark ? 'border-white/30' : 'border-gray-400'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
            isDark ? 'bg-white/50' : 'bg-gray-600'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 