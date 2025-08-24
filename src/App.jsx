import React from 'react';
import { Navbar, ThemeDemo, Footer } from './components';
import { Header, Hero } from './sections';
import { ThemeProvider } from './contexts';
import { themeClasses } from './styles/theme';

function App() {
  return (
    <ThemeProvider>
      <div className={`min-h-screen ${themeClasses.backgrounds.primary} ${themeClasses.transitions.theme}`}>
        <Header />
        <Hero />
        <main className="container mx-auto px-4 py-8">
          <section id="features" className="py-16">
            <h2 className={`text-3xl font-bold ${themeClasses.text.primary} mb-4 ${themeClasses.transitions.theme}`}>
              Features
            </h2>
            <p className={`${themeClasses.text.secondary} ${themeClasses.transitions.theme} mb-8`}>
              Discover what makes MoodMate special
            </p>
            <ThemeDemo />
          </section>
          
          <section id="demo" className="py-16">
            <h2 className={`text-3xl font-bold ${themeClasses.text.primary} mb-4 ${themeClasses.transitions.theme}`}>
              Demo
            </h2>
            <p className={`${themeClasses.text.secondary} ${themeClasses.transitions.theme} mb-8`}>
              See MoodMate in action
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
