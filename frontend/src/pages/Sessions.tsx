import { Clock, Activity, CheckCircle, ChevronRight } from 'lucide-react';

export default function Sessions() {
  const sessions = [
    { id: 1, date: 'Today, 8:00 AM', duration: '45 min', score: 92, mode: 'Fresher' },
    { id: 2, date: 'Yesterday, 7:30 AM', duration: '30 min', score: 88, mode: 'Fresher' },
    { id: 3, date: 'Oct 12, 6:00 PM', duration: '60 min', score: 85, mode: 'Practitioner' },
    { id: 4, date: 'Oct 10, 8:00 AM', duration: '45 min', score: 94, mode: 'Fresher' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif font-light text-neutral-900 dark:text-white mb-2">Practice History</h1>
          <p className="text-neutral-600 dark:text-neutral-400 font-light">
            Reflecting on your journey towards stillness.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden">
        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {sessions.map((session) => (
            <li key={session.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-brand-50 dark:bg-brand-900/20 w-12 h-12 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {session.date}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-neutral-500">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {session.duration}</span>
                      <span className="flex items-center"><Activity className="w-4 h-4 mr-1.5" /> Score: {session.score}%</span>
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium">
                        {session.mode}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
