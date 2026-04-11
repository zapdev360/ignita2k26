import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Linkedin, Github, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParticleField from "@/components/ParticleField";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ScrollProgress from "@/components/ScrollProgress";

const teamSections = [
  {
    title: "Faculty Coordinators",
    members: [
      { name: "Dr. Arun Sharma", role: "Faculty Advisor", initials: "AS" },
      { name: "Prof. Meera Gupta", role: "Co-Advisor", initials: "MG" },
    ],
  },
  {
    title: "Core Committee",
    members: [
      { name: "Arjun Mehta", role: "President", initials: "AM" },
      { name: "Priya Chatterjee", role: "Vice President", initials: "PC" },
      { name: "Rohit Kumar", role: "General Secretary", initials: "RK" },
      { name: "Sneha Das", role: "Treasurer", initials: "SD" },
    ],
  },
  {
    title: "Event Heads",
    members: [
      { name: "Vikram Singh", role: "Ideathon Lead", initials: "VS" },
      { name: "Ananya Roy", role: "Coding Quest Lead", initials: "AR" },
      { name: "Karan Joshi", role: "Gaming Arena Lead", initials: "KJ" },
      { name: "Isha Patel", role: "Cultural Lead", initials: "IP" },
      { name: "Rahul Dey", role: "Quiz Lead", initials: "RD" },
      { name: "Tanvi Mishra", role: "Game Dev Lead", initials: "TM" },
    ],
  },
  {
    title: "Design & Dev Team",
    members: [
      { name: "Aditya Bose", role: "Lead Developer", initials: "AB" },
      { name: "Nisha Kumari", role: "UI/UX Designer", initials: "NK" },
      { name: "Farhan Ali", role: "Backend Dev", initials: "FA" },
      { name: "Ritika Sen", role: "Graphic Designer", initials: "RS" },
    ],
  },
];

const MemberCard = ({
  member,
  index,
}: {
  member: { name: string; role: string; initials: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.6, 1]), {
    stiffness: 120,
    damping: 20,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      whileHover={{ y: -10 }}
      className="glass-card p-5 text-center group relative overflow-hidden shimmer-card animated-border-glow cursor-pointer"
    >
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
        <span className="font-heading text-xl font-bold text-primary">
          {member.initials}
        </span>
      </div>
      <h3 className="font-heading text-base font-semibold text-foreground">
        {member.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-1">{member.role}</p>

      {/* Hover overlay with links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute inset-0 bg-card/90 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <motion.a
          href="#"
          whileHover={{ scale: 1.2 }}
          className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-primary"
        >
          <Linkedin size={18} />
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.2 }}
          className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-primary"
        >
          <Github size={18} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const Team = () => (
  <PageTransition>
    <div className="min-h-screen bg-background scanline-overlay">
      <ParticleField />
      <AnimatedBlobs />
      <ScrollProgress />
      <Navbar />

      <section className="relative min-h-[50vh] flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="font-heading text-5xl md:text-7xl font-bold mb-4"
          >
            Our <span className="gradient-text">Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            The people behind IGNITIA'26 — organizers, creators, and dreamers.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto space-y-20">
          {teamSections.map((section, si) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-sm text-primary uppercase tracking-widest mb-1">
                  {section.title}
                </p>
                <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-transparent" />
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.members.map((member, i) => (
                  <MemberCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  </PageTransition>
);

export default Team;
