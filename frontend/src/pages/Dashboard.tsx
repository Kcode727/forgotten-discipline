import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Clock, Award, Info } from 'lucide-react';

export default function Dashboard() {
  const [userName, setUserName] = useState('Seeker');
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setUserName(user);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white mb-4">
          Welcome back, {userName}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl">
          Stillness is not the absence of movement, but the harmony of it. 
          Ready for today's practice?
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Clock className="text-amber-500" />} label="Time Practiced" value="4h 30m" />
        <StatCard icon={<Flame className="text-orange-500" />} label="Current Streak" value="5 Days" />
        <StatCard icon={<Activity className="text-brand-500" />} label="Avg. Accuracy" value="84%" />
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm relative group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl">
              <Award className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="relative group/tooltip">
              <Info className="w-5 h-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer" />
              <div className="absolute right-0 w-48 p-2 bg-neutral-800 text-xs text-white rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 -top-2 translate-y-[-100%] shadow-xl">
                You can easily change mode from settings
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-500 font-medium mb-1">Current Mode</p>
          <p className="text-2xl font-serif text-neutral-900 dark:text-white">Fresher</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-serif font-light mb-6">Weekly Journey</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 min-h-[300px] flex items-end justify-between space-x-2">
            {[40, 70, 45, 90, 65, 30, 80].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center group">
                <div 
                  className="w-full max-w-[40px] bg-brand-100 dark:bg-brand-900/40 rounded-t-xl group-hover:bg-brand-500 dark:group-hover:bg-brand-500 transition-colors relative"
                  style={{ height: `${height * 2}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-xs text-white px-2 py-1 rounded">
                    {height}m
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-neutral-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-light mb-6">Achievements</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 space-y-4">
            <AchievementCard title="First Breath" desc="Completed your first session" />
            <AchievementCard title="Steady Tree" desc="Held Tree Pose for 1 min" />
            <AchievementCard title="Perfect Alignment" desc="Scored 95% accuracy" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm transition-transform hover:-translate-y-1">
      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-2xl w-max mb-4">
        {icon}
      </div>
      <p className="text-sm text-neutral-500 font-medium mb-1">{label}</p>
      <p className="text-2xl font-serif text-neutral-900 dark:text-white">{value}</p>
    </div>
  );
}

function AchievementCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-500">
        <Award className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-medium text-neutral-900 dark:text-white text-sm">{title}</h4>
        <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
