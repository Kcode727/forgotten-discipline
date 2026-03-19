import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('user', 'Demo User');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-2xl shadow-neutral-200 dark:shadow-none dark:border dark:border-neutral-800">
        <h2 className="text-3xl font-serif font-light text-center mb-8 text-neutral-900 dark:text-white">
          {isSignUp ? 'Begin your journey' : 'Welcome back'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-0 transition-all outline-none"
                placeholder="Bodhi"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-0 transition-all outline-none"
              placeholder="seeker@path.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-0 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/20 active:scale-95"
          >
            {isSignUp ? 'Step into stillness' : 'Continue practice'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
          {isSignUp ? "Already on the path?" : "New to the discipline?"}{' '}
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}
