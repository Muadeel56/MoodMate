import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Header } from './sections';
import { ThemeProvider, AuthProvider } from './contexts';
import { themeClasses } from './styles/theme';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className={`min-h-screen ${themeClasses.backgrounds.primary} ${themeClasses.transitions.theme}`}>
            <Header />
            <AppRoutes />
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
