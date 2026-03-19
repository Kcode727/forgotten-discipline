import { useState, useEffect } from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper: applies theme both to DOM and saves to localStorage
function applyTheme(t: string) {
  if (t === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', t);
}

export default function Settings() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'fresher');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Apply theme immediately whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Persist mode immediately
  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const modes = [
    {
      id: 'practitioner',
      title: 'Practitioner',
      emoji: '🧘',
      desc: 'Strict alignment, minimal narration. For those who know the path.',
    },
    {
      id: 'fresher',
      title: 'Fresher',
      emoji: '🌱',
      desc: 'Gentle guidance, frequent corrections. For new seekers.',
    },
    {
      id: 'healing',
      title: 'Healing',
      emoji: '🌿',
      desc: 'Softer cues, focus on breathing and hold. For recovery.',
    },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-serif font-light text-neutral-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 space-y-12">
        {/* ── Practice Modality ──────────────────────────────── */}
        <section>
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
            Practice Modality
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            Controls how Bodhi coaches you during a session.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`relative p-6 rounded-2xl text-left transition-all border-2 ${
                  mode === m.id
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-md shadow-brand-500/10'
                    : 'border-transparent bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{m.emoji}</span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      mode === m.id
                        ? 'border-brand-500 bg-brand-500'
                        : 'border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    {mode === m.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <h3
                  className={`font-semibold mb-1 ${
                    mode === m.id
                      ? 'text-brand-700 dark:text-brand-300'
                      : 'text-neutral-900 dark:text-white'
                  }`}
                >
                  {m.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {m.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        <hr className="border-neutral-200 dark:border-neutral-800" />

        {/* ── Appearance ────────────────────────────────────── */}
        <section className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-1">
              Appearance
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Currently: <span className="font-medium capitalize">{theme} mode</span>
            </p>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative inline-flex h-12 w-24 rounded-full bg-neutral-200 dark:bg-neutral-700 transition-colors duration-300 outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            {/* sliding thumb */}
            <span
              className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-900 shadow-md transition-transform duration-300 ease-in-out ${
                theme === 'dark' ? 'translate-x-12' : 'translate-x-1'
              }`}
            >
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-brand-400" />
              )}
            </span>
            {/* background icons */}
            <span className="flex w-full items-center justify-around px-3">
              <Sun
                className={`h-4 w-4 text-amber-400 transition-opacity ${
                  theme === 'dark' ? 'opacity-70' : 'opacity-0'
                }`}
              />
              <Moon
                className={`h-4 w-4 text-brand-400 transition-opacity ${
                  theme === 'light' ? 'opacity-70' : 'opacity-0'
                }`}
              />
            </span>
          </button>
        </section>

        <hr className="border-neutral-200 dark:border-neutral-800" />

        {/* ── Account ───────────────────────────────────────── */}
        <section className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-1">
              Account
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Signed in as{' '}
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {localStorage.getItem('user') || 'Demo User'}
              </span>
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border-2 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </section>
      </div>
    </div>
  );
}
