import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Code,
  Brain,
  Gamepad2,
  HelpCircle,
  Music,
  Cpu,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    icon: Lightbulb,
    title: "Ideathon",
    description:
      "Pitch groundbreaking ideas to solve real-world problems. Innovation meets impact.",
    prize: "₹30,000",
    color: "from-primary/20 to-neon-cyan/20",
  },
  {
    icon: Code,
    title: "Coding Quest",
    description:
      "Battle through algorithmic challenges. Speed, logic, and precision.",
    prize: "₹25,000",
    color: "from-neon-cyan/20 to-secondary/20",
  },
  {
    icon: Brain,
    title: "Quiz Competition",
    description:
      "Test your knowledge across tech, science, pop culture, and more.",
    prize: "₹15,000",
    color: "from-secondary/20 to-neon-pink/20",
  },
  {
    icon: Gamepad2,
    title: "Gaming Arena",
    description:
      "Compete in intense esports battles. Valorant, BGMI, and more.",
    prize: "₹30,000",
    color: "from-neon-pink/20 to-primary/20",
  },
  {
    icon: HelpCircle,
    title: "Guess Who",
    description: "A mystery event full of surprises. Can you decode the clues?",
    prize: "₹10,000",
    color: "from-primary/20 to-secondary/20",
  },
  {
    icon: Music,
    title: "Cultural Fest",
    description: "Dance, music, drama, and art. Unleash your creative soul.",
    prize: "₹20,000",
    color: "from-neon-cyan/20 to-neon-pink/20",
  },
  {
    icon: Cpu,
    title: "Game Dev Hackathon",
    description:
      "Build a game from scratch in 24 hours. Creativity meets code.",
    prize: "₹35,000",
    color: "from-secondary/20 to-primary/20",
  },
];

const TiltCard = ({ event }: { event: (typeof events)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    VanillaTilt.init(ref.current, {
      max: 10,
      speed: 450,
      scale: 1.03,
      glare: true,
      "max-glare": 0.18,
      perspective: 1000,
    });

    return () => {
      ref.current?.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="featured-event-card glass-card bg-card/75 backdrop-blur-2xl p-6 group hover:border-primary/30 transition-all duration-300 cursor-pointer shimmer-card animated-border-glow"
    >
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <event.icon size={24} className="text-foreground" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
        {event.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {event.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          🏆 {event.prize}
        </span>
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
          Learn More{" "}
          <ArrowRight
            size={12}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </div>
    </div>
  );
};

const FeaturedEvents = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-event-card",
        { autoAlpha: 0, y: 60, scale: 0.9, rotateX: 10 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 28%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary uppercase tracking-widest mb-2">
            Compete & Create
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Featured <span className="gradient-text glitch-text">Events</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <TiltCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
