import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import CodeRain from "./CodeRain";
import FloatingBadges from "./FloatingBadges";
import CountdownTimer from "./CountdownTimer";

const tagline = "Igniting Innovation, Creativity & Competition";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const letters = letterRefs.current.filter(Boolean);
    if (!letters.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        {
          y: 64,
          autoAlpha: 0,
          scale: 0.88,
          rotateX: -35,
          filter: "blur(10px)",
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.25,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.35,
          clearProps: "filter",
        },
      );
    }, titleRef.current as HTMLElement);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= tagline.length) {
        setTypedText(tagline.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden"
    >
      <CodeRain />
      {/* Animated background orbs */}
      <div className="particles-bg">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-neon-cyan/8 blur-[80px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <FloatingBadges />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-muted-foreground"
          >
            <Sparkles
              size={14}
              className="text-primary animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span>Microsoft Student Society × UEM Kolkata</span>
          </motion.div>

          {/* Character-by-character reveal */}
          <motion.h1
            ref={titleRef}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          >
            {"IGNITIA 2K26".split("").map((char, i) => (
              <span
                key={`${char}-${i}`}
                className={`hero-letter inline-block ${i < 7 ? "gradient-text text-glow-blue glitch-text" : "text-foreground"}`}
                ref={(el) => {
                  if (el) letterRefs.current[i] = el;
                }}
              >
                {char}
              </span>
            ))}
          </motion.h1>

          {/* Typewriter tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl h-8"
          >
            {typedText}
            <span className="animate-blink ml-0.5 text-primary">|</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.75 }}
            className="flex items-center gap-4 text-sm text-muted-foreground"
          >
            <span className="glass-card px-3 py-1 shimmer-card">
              📅 1st & 2nd August 2026
            </span>
            <span className="glass-card px-3 py-1 shimmer-card">
              📍 UEM Kolkata
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <a
              href="#register"
              className="glow-button pulse-cta cta-sweep inline-flex items-center gap-2 ripple-button"
            >
              Register Now <ArrowRight size={18} />
            </a>
            <a
              href="#events"
              className="glow-button-secondary inline-flex items-center gap-2 ripple-button"
            >
              Explore Events
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.9 }}
            className="w-full"
          >
            <CountdownTimer embedded />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
