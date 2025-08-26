import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { themeClasses, gradients } from '../styles/theme';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@moodmate.app' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'San Francisco, CA' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className={`${themeClasses.backgrounds.secondary} border-t ${themeClasses.borders.primary} ${themeClasses.transitions.theme}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${gradients.navbar} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className={`${themeClasses.text.primary} font-bold text-xl leading-tight`}>MoodMate</span>
                <span className={`${themeClasses.text.secondary} text-xs font-medium`}>Your Mood Companion</span>
              </div>
            </div>
            <p className={`${themeClasses.text.secondary} text-sm leading-relaxed mb-4`}>
              Track your mood, understand patterns, and build better mental health habits with your personal AI-powered companion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`${themeClasses.text.secondary} hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 ${themeClasses.transitions.theme} group`}
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`${themeClasses.text.primary} font-semibold text-lg mb-4`}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${themeClasses.text.secondary} hover:text-purple-600 dark:hover:text-purple-400 text-sm ${themeClasses.transitions.theme} hover:underline`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`${themeClasses.text.primary} font-semibold text-lg mb-4`}>Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${themeClasses.text.secondary} hover:text-purple-600 dark:hover:text-purple-400 text-sm ${themeClasses.transitions.theme} hover:underline`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className={`${themeClasses.text.primary} font-semibold text-lg mb-4`}>Contact Us</h3>
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${themeClasses.text.secondary} hover:text-purple-600 dark:hover:text-purple-400 ${themeClasses.transitions.theme} group`}
                  >
                    <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{contact.text}</span>
                  </div>
                );
              })}
            </div>

            <div>
              <h3 className={`${themeClasses.text.primary} font-semibold text-lg mb-2`}>Stay Updated</h3>
              <p className={`${themeClasses.text.secondary} text-sm mb-4`}>
                Get the latest updates and mood tips delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-2 border ${themeClasses.borders.primary} rounded-lg ${themeClasses.backgrounds.primary} ${themeClasses.text.primary} placeholder-${themeClasses.text.tertiary} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeClasses.transitions.theme}`}
                />
                <button className={`${gradients.secondary} ${gradients.secondaryHover} text-white px-6 py-2 rounded-lg text-sm font-medium ${themeClasses.transitions.theme} transform hover:scale-105 shadow-lg`}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${themeClasses.borders.primary} mt-12 pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`flex items-center space-x-2 ${themeClasses.text.secondary} text-sm`}>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by the MoodMate team</span>
            </div>
            <div className={`flex items-center space-x-6 ${themeClasses.text.secondary} text-sm`}>
              <span>&copy; {currentYear} MoodMate. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 