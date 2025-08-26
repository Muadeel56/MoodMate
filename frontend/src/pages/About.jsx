import React from 'react';
import { themeClasses } from '../styles/theme';

function About() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16">
        <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-6 ${themeClasses.transitions.theme}`}>
          About MoodMate
        </h1>
        <div className={`prose ${themeClasses.text.secondary} ${themeClasses.transitions.theme} max-w-none`}>
          <p className="mb-6">
            MoodMate is your personal companion for emotional well-being and mood tracking. 
            Our mission is to help you understand your emotional patterns and develop healthier 
            mental habits through intuitive design and thoughtful features.
          </p>
          
          <h2 className={`text-2xl font-semibold ${themeClasses.text.primary} mb-4 ${themeClasses.transitions.theme}`}>
            Our Vision
          </h2>
          <p className="mb-6">
            We believe that everyone deserves tools to better understand and manage their mental health. 
            MoodMate combines modern technology with evidence-based approaches to provide you with 
            insights into your emotional well-being.
          </p>
          
          <h2 className={`text-2xl font-semibold ${themeClasses.text.primary} mb-4 ${themeClasses.transitions.theme}`}>
            Key Features
          </h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Daily mood tracking with customizable categories</li>
            <li>Beautiful, accessible design that adapts to your preferences</li>
            <li>Privacy-focused data handling</li>
            <li>Insights and patterns analysis</li>
            <li>Cross-platform compatibility</li>
          </ul>
          
          <h2 className={`text-2xl font-semibold ${themeClasses.text.primary} mb-4 ${themeClasses.transitions.theme}`}>
            Get Started
          </h2>
          <p className="mb-6">
            Ready to begin your journey with MoodMate? Start tracking your mood today and 
            discover patterns that can help you lead a more balanced life.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About; 