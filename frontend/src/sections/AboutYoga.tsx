import Section from "../components/ui/Section";
import Container from "../components/ui/Container";

const AboutYoga = () => {
  return (
    <Section className="py-28 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 dark:text-white leading-tight">
              What is <span className="text-brand-600 dark:text-brand-400">Yoga?</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-neutral-600 dark:text-neutral-400">
              Yoga is the quiet conversation between breath and being.
              It is strength without aggression, movement without noise,
              and discipline without force. In stillness, it reveals
              who we are beneath the chaos.
            </p>
            <p className="text-lg leading-relaxed font-light text-neutral-500 dark:text-neutral-500 italic">
              "Yoga is the journey of the self, through the self, to the self."
            </p>
          </div>
          <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
            <div className="absolute -inset-4 bg-brand-100 dark:bg-brand-900/20 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <img 
              src="/yoga_serenity_landscape_1773906397251.png" 
              alt="Yoga Serenity" 
              className="relative w-full aspect-[4/5] object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutYoga;