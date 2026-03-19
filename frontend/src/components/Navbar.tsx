import { Link, useLocation } from 'react-router-dom';
import { User, Settings, Activity, LayoutDashboard, Home } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Navbar() {
  const location = useLocation();
  const user = localStorage.getItem('user');

  const isDashboardArea = ['/dashboard', '/sessions', '/practice', '/settings'].some(path => location.pathname.startsWith(path));
  const isSignInPage = location.pathname === '/signin';
  const isExplorePage = location.pathname === '/explore';

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-neutral-50/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 outline-none">
            <span className="font-serif text-2xl font-light tracking-wide text-brand-700 dark:text-brand-400">Bodhi</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isDashboardArea ? (
              <div className="flex space-x-1 sm:space-x-4">
                <NavLink to="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
                <NavLink to="/practice" icon={<Activity className="w-4 h-4" />} label="Practice" />
                <NavLink to="/sessions" icon={<Home className="w-4 h-4" />} label="Sessions" />
                <NavLink to="/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
              </div>
            ) : (
              !isSignInPage && (
                user ? (
                  <Link
                    to="/dashboard"
                    className="px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95 flex items-center space-x-2"
                  >
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    to="/signin"
                    className="px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95"
                  >
                    Sign In / Sign Up
                  </Link>
                )
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 outline-none",
        isActive
          ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
      )}
    >
      {icon}
      <span className="hidden sm:block">{label}</span>
    </Link>
  );
}

export default Navbar;
