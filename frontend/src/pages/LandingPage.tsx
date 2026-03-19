import { motion, type Variants } from 'framer-motion';
import { ChevronRight, ArrowRight, ScanLine, Mic2, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 border-t border-transparent overflow-hidden">
      {/* Section 1: Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerChildren}
          className="relative z-10 max-w-4xl"
        >
          <motion.h1 variants={fadeIn} className="text-7xl md:text-9xl font-serif font-light text-neutral-900 dark:text-neutral-50 mb-6 tracking-tight">
            Yoga
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl md:text-3xl font-light text-neutral-600 dark:text-neutral-400 mb-12 tracking-wide font-serif italic">
            "The forgotten discipline"
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link 
              to="/signin" 
              className="inline-flex items-center space-x-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 px-8 py-4 rounded-full text-lg font-medium transition-transform hover:scale-105 active:scale-95 group"
            >
              <span>Step into stillness</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: What is Yoga */}
      <section className="py-32 px-4 relative z-10 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-light text-neutral-900 dark:text-neutral-100 leading-tight">
              What is <span className="text-brand-600 dark:text-brand-400">Yoga?</span>
            </h2>
            <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
              Yoga is the art of attention. A discipline of presence. It refines the body, clarifies the mind, and reveals the self beneath distraction.
            </p>
            <p className="text-lg text-neutral-500 dark:text-neutral-500 font-light italic leading-relaxed">
              "Yoga is the journey of the self, through the self, to the self."
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-brand-100 dark:bg-brand-900/20 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <img
              src="/yoga_serenity_landscape_1773906397251.png"
              alt="Yoga serenity"
              className="relative w-full aspect-[4/5] object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3: AI Agent */}
      <section className="py-32 px-4 relative z-10 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium tracking-wide border border-brand-100 dark:border-brand-800 mb-4">
              AI-Powered · Real-time
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-neutral-900 dark:text-neutral-100">
              Meet{' '}
              <span className="relative inline-block">
                <span className="text-brand-600 dark:text-brand-400 font-normal">Bodhi</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-300 via-brand-500 to-transparent rounded-full" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
              Your personalized real-time AI yoga guide — watches your posture,
              speaks corrections, and adapts to how you practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={ScanLine}
              title="Real-time Alignment"
              accent="from-brand-500 to-teal-400"
              desc="MoveNet skeleton tracking maps your body joints every frame and spots alignment issues instantly."
            />
            <FeatureCard
              icon={Mic2}
              title="Voice Coaching"
              accent="from-violet-500 to-brand-400"
              desc="Bodhi speaks corrections aloud so you keep your eyes closed and stay present in the pose."
            />
            <FeatureCard
              icon={Layers3}
              title="Three Modalities"
              accent="from-amber-400 to-orange-400"
              desc="Fresher, Practitioner, or Healing — each mode adjusts correction intensity and verbal style."
            />
          </div>
        </div>
      </section>

      {/* Section 4: Explore */}
      <section className="py-32 px-4 relative z-10 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif font-light text-neutral-900 dark:text-neutral-100">
            Explore the Forgotten
          </h2>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Know about the emergence and evolution of yoga. Be a part of the history, understanding its deep roots and transformative journey.
          </p>
          <div>
            <Link 
              to="/explore"
              className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all shadow-lg shadow-brand-500/20 active:scale-95"
            >
              <span>Explore</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      className="group bg-white dark:bg-neutral-950 p-8 rounded-3xl shadow-[0_4px_40px_-10px_rgba(0,0,0,0.07)] dark:shadow-none dark:border dark:border-neutral-800 hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden"
    >
      {/* Card glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${accent} transition-opacity duration-500 rounded-3xl`} />

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${accent} shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
