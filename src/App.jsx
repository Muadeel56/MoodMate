import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeDemo from './components/ThemeDemo';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-primary transition-theme">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-theme-primary mb-4 transition-theme">
            Welcome to MoodMate
          </h1>
          <p className="text-theme-secondary transition-theme mb-8">
            Your personal mood tracking companion
          </p>
          <ThemeDemo />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
