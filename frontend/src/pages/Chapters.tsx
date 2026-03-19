import { motion } from 'framer-motion';

export default function Chapters() {
  const chapters = [
    {
      title: "The Emergence",
      excerpt: "Yoga predates written history. Its origins lie in northern India over 5,000 years ago. The word yoga was first mentioned in the oldest sacred texts, the Rig Veda.",
      year: "3000 BCE"
    },
    {
      title: "The Classical Period",
      excerpt: "Defined by Patanjali's Yoga Sutras, a systematic presentation of yoga. This 195-aphorism text outlines the eight-limbed path toward samadhi or enlightenment.",
      year: "500 BCE"
    },
    {
      title: "Post-Classical Yoga",
      excerpt: "A shift away from ancient rituals. Yoga masters created a system of practices designed to rejuvenate the body and prolong life, leading to the creation of Hatha Yoga.",
      year: "1300 CE"
    },
    {
      title: "The Modern Era",
      excerpt: "Yoga arrives in the West. Masters like Swami Vivekananda and later T. Krishnamacharya brought yoga to the world, adapting it into the diverse physical practices seen today.",
      year: "1900 CE"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-serif font-light text-neutral-900 dark:text-white mb-6">Explore the Forgotten</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          Journey through the evolution of a practice that has guided seekers for millennia.
        </p>
      </div>

      <div className="relative border-l-2 border-brand-200 dark:border-brand-900/50 pl-8 ml-4 md:ml-12 space-y-24">
        {chapters.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-brand-500 ring-4 ring-neutral-50 dark:ring-neutral-900" />

            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all">
              <span className="text-sm font-medium tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-4 block">
                {chapter.year}
              </span>
              <h2 className="text-3xl font-serif font-light text-neutral-900 dark:text-white mb-4">
                {chapter.title}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                {chapter.excerpt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
