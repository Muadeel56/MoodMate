import React from 'react';
import { Navbar, ThemeDemo } from './components';
import { Header, Hero } from './sections';
import { ThemeProvider } from './contexts';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-primary transition-theme">
        <Header />
        <Hero />
        <main className="container mx-auto px-4 py-8">
          <section id="features" className="py-16">
            <h2 className="text-3xl font-bold text-theme-primary mb-4 transition-theme">
              Features
            </h2>
            <p className="text-theme-secondary transition-theme mb-8">
              Discover what makes MoodMate special
            </p>
            <ThemeDemo />
          </section>
          
          <section id="demo" className="py-16">
            <h2 className="text-3xl font-bold text-theme-primary mb-4 transition-theme">
              Demo
            </h2>
            <p className="text-theme-secondary transition-theme mb-8">
              See MoodMate in action
            </p>
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
