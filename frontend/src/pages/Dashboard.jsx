import React from 'react';
import { themeClasses } from '../styles/theme';

function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-16">
        <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-6 ${themeClasses.transitions.theme}`}>
          Your Mood Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats Cards */}
          <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-2`}>
              Today's Mood
            </h3>
            <p className={`text-3xl font-bold ${themeClasses.text.accent}`}>
              😊
            </p>
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              Happy
            </p>
          </div>
          
          <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-2`}>
              Streak
            </h3>
            <p className={`text-3xl font-bold ${themeClasses.text.accent}`}>
              7 days
            </p>
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              Consistent tracking
            </p>
          </div>
          
          <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
            <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-2`}>
              Average Mood
            </h3>
            <p className={`text-3xl font-bold ${themeClasses.text.accent}`}>
              8.2/10
            </p>
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              This week
            </p>
          </div>
        </div>
        
        {/* Recent Entries */}
        <div className={`p-6 rounded-lg ${themeClasses.backgrounds.secondary} ${themeClasses.transitions.theme}`}>
          <h2 className={`text-2xl font-semibold ${themeClasses.text.primary} mb-4`}>
            Recent Mood Entries
          </h2>
          <div className="space-y-4">
            <div className={`p-4 rounded ${themeClasses.backgrounds.primary} ${themeClasses.transitions.theme}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${themeClasses.text.primary}`}>Today</p>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>Feeling productive and energetic</p>
                </div>
                <span className="text-2xl">😊</span>
              </div>
            </div>
            
            <div className={`p-4 rounded ${themeClasses.backgrounds.primary} ${themeClasses.transitions.theme}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${themeClasses.text.primary}`}>Yesterday</p>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>Had a relaxing day</p>
                </div>
                <span className="text-2xl">😌</span>
              </div>
            </div>
            
            <div className={`p-4 rounded ${themeClasses.backgrounds.primary} ${themeClasses.transitions.theme}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${themeClasses.text.primary}`}>2 days ago</p>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>Feeling a bit stressed</p>
                </div>
                <span className="text-2xl">😐</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard; 