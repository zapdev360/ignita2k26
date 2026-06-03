import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Target, Lightbulb, Users, Cpu, Globe, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParticleField from "@/components/ParticleField";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ScrollProgress from "@/components/ScrollProgress";
import AboutSection3 from "@/components/ui/about-section";

const clubs = [
  { name: "IEM-UEM group", role: "Lead Organizer", icon: Cpu },
  { name: "Google Developer Group", role: "Tech Partner", icon: Globe },
  { name: "IEEE Student Branch", role: "Knowledge Partner", icon: Lightbulb },
  { name: "ACM Chapter", role: "Coding Partner", icon: Sparkles },
];

const stats = [
  { value: "7+", label: "Events" },
  { value: "1000+", label: "Participants" },
  { value: "₹2L+", label: "Prize Pool" },
  { value: "50+", label: "Colleges" },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useSpring(useTransform(heroProgress, [0, 1], [1, 1.15]), {
    stiffness: 80,
    damping: 20,
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const visionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: visionProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "center center"],
  });
  const visionRotateX = useSpring(
    useTransform(visionProgress, [0, 1], [20, 0]),
    { stiffness: 60, damping: 20 },
  );
  const visionY = useSpring(useTransform(visionProgress, [0, 1], [100, 0]), {
    stiffness: 60,
    damping: 20,
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanline-overlay">
        <ParticleField />
        <AnimatedBlobs />
        <ScrollProgress />
        <Navbar />

        {/* Hero - Sticky zoom */}
        <motion.section
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative min-h-screen flex items-center justify-center pt-16"
        >
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] md:text-xs text-orange-500 uppercase tracking-[0.4em] mb-3 font-semibold font-mono"
            >
              OUR STORY & VISION — IGNITIA &apos;26
            </motion.p>
            <div className="relative inline-block mb-3 px-4">
              {/* Futuristic Cyber brackets */}
              <div className="absolute left-0 -top-2 w-3 h-3 border-t-2 border-l-2 border-orange-500/50" />
              <div className="absolute right-0 -top-2 w-3 h-3 border-t-2 border-r-2 border-orange-500/50" />
              <div className="absolute left-0 -bottom-2 w-3 h-3 border-b-2 border-l-2 border-orange-500/50" />
              <div className="absolute right-0 -bottom-2 w-3 h-3 border-b-2 border-r-2 border-orange-500/50" />

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="font-heading text-5xl md:text-7xl font-black tracking-wider uppercase mb-0"
              >
                <span className="text-white/40 font-light mr-3 select-none">ABOUT</span>
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-pulse">
                  IGNITIA
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-sm max-w-xl mx-auto font-medium leading-relaxed"
            >
              The flagship multi-domain event organized by the IEM-UEM group
              at UEM Kolkata — where innovation, creativity, and
              competition converge.
            </motion.p>
          </div>
        </motion.section>

        {/* Vision - Redesigned UI */}
        <AboutSection3 />

        {/* Clubs - Diagonal entry */}
        <section className="section-padding">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm text-primary uppercase tracking-widest mb-2">
                Collaborating Societies
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Powered by <span className="gradient-text">Community</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clubs.map((club, i) => (
                <motion.div
                  key={club.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 60 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass-card bg-card/75 backdrop-blur-2xl p-6 text-center shimmer-card animated-border-glow cursor-pointer"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <club.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {club.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{club.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IEM-UEM group */}
        <section className="section-padding">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card bg-card/75 backdrop-blur-2xl p-8 md:p-12 max-w-4xl mx-auto text-center shimmer-card"
            >
              <Users className="text-primary mx-auto mb-4" size={40} />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                IEM-UEM group
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The IEM-UEM group are a thriving ecosystem of education and
                innovation, fostering excellence in engineering, management,
                and science across their various campuses.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                IGNITIA is their flagship annual event, bringing together the
                best minds from across the region to compete, learn, and
                celebrate technology.
              </p>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
