import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import bg from "../assets/bg.jpg";

const Hero = () => {
  return (
    <Section
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <Container>
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-wide">
            Yoga
          </h1>

          <p className="text-lg md:text-2xl font-light opacity-90">
            The Forgotten Discipline
          </p>

          <div className="pt-4">
            <Button>
              Awaken Yourself
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;