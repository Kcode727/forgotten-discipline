import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Sessions from './pages/Sessions';
import Settings from './pages/Settings';
import Chapters from './pages/Chapters';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';

// Apply theme synchronously before first paint – avoids flash of wrong theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

function App() {
  // Restore persisted theme on startup
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-50 font-sans selection:bg-teal-200 dark:selection:bg-teal-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Chapters />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:pose" element={<Practice />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
