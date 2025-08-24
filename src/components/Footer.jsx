import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Heart,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/moodmate', 
      icon: Facebook,
      ariaLabel: 'Follow us on Facebook'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/moodmate', 
      icon: Twitter,
      ariaLabel: 'Follow us on Twitter'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/moodmate', 
      icon: Instagram,
      ariaLabel: 'Follow us on Instagram'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/moodmate', 
      icon: Linkedin,
      ariaLabel: 'Follow us on LinkedIn'
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/moodmate', 
      icon: Github,
      ariaLabel: 'View our GitHub repository'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Journal', href: '#journal' },
    { name: 'Music', href: '#music' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Data Protection', href: '/data-protection' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: 'hello@moodmate.com',
      href: 'mailto:hello@moodmate.com',
      ariaLabel: 'Send us an email'
    },
    {
      icon: Phone,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      ariaLabel: 'Call us'
    },
    {
      icon: MapPin,
      text: '123 Wellness St, Mind City, MC 12345',
      href: 'https://maps.google.com',
      ariaLabel: 'View our location on map'
    }
  ];

  return (
    <footer className="bg-theme-secondary border-t border-theme-border transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-theme-primary font-bold text-xl leading-tight">MoodMate</span>
                <span className="text-theme-secondary text-xs font-medium">Your Mood Companion</span>
              </div>
            </div>
            <p className="text-theme-secondary text-sm leading-relaxed mb-4">
              Empowering your mental wellness journey with personalized mood tracking, 
              journaling, and therapeutic music experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="text-theme-secondary hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
                  >
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-theme-primary font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-theme-secondary hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-theme-primary font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-theme-secondary hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-theme-primary font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <li key={index}>
                    <a
                      href={contact.href}
                      aria-label={contact.ariaLabel}
                      className="flex items-start space-x-3 text-theme-secondary hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 group"
                    >
                      <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm leading-relaxed">{contact.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-theme-border pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-theme-primary font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-theme-secondary text-sm mb-4">
              Get the latest updates on new features and wellness tips.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-theme-border rounded-lg bg-theme-primary text-theme-primary placeholder-theme-tertiary focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                aria-label="Email address for newsletter"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-theme-secondary text-sm">
              <span>© {currentYear} MoodMate. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for your wellness.</span>
            </div>
            <div className="flex items-center space-x-6 text-theme-secondary text-sm">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 