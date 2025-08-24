import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to MoodMate</h1>
        <p className="text-gray-600">Your personal mood tracking companion</p>
      </main>
    </div>
  )
}

export default App
