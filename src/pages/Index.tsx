import { Suspense, lazy, useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Highlights from "@/components/Highlights";
import WhyAttend from "@/components/WhyAttend";
import Sponsors from "@/components/Sponsors";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ParallaxSection from "@/components/ParallaxSection";
import PageTransition from "@/components/PageTransition";
import { useIsMobile } from "@/hooks/use-mobile";
import CharacterHeroScene from "@/components/CharacterHeroScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeEffects = lazy(() => import("@/components/HomeEffects"));
const mapEmbedSrc = "https://www.google.com/maps?q=University+of+Engineering+%26+Management,+Kolkata+(UEM)&z=17&output=embed";
const mapHref = "https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5599202,88.4899014,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5599202!4d88.4899014!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D";

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const indexRef = useRef<HTMLDivElement>(null);
  const characterScrollProgressRef = useRef(0);

  useEffect(() => {
    const onLoaderComplete = () => setIsLoaded(true);
    window.addEventListener("ignitia:loader-complete", onLoaderComplete);

    // Dynamic fallback safeguard
    const fallbackId = window.setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener("ignitia:loader-complete", onLoaderComplete);
      window.clearTimeout(fallbackId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create GSAP ScrollTrigger timeline to pin the section and animate overlay texts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#character-showcase-section",
          start: "top top",
          end: isMobile ? "+=1200" : "+=2000",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            characterScrollProgressRef.current = self.progress;
          },
        },
      });

      // Phase 1: Fade out and translate the intro overlay
      tl.to("#showcase-overlay-intro", {
        opacity: 0,
        x: isMobile ? 0 : -80,
        y: isMobile ? -50 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Phase 2: Fade in and slide up the about overlay
      tl.fromTo(
        "#showcase-overlay-about",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );
    }, indexRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <PageTransition>
      <div ref={indexRef} className="min-h-screen flex flex-col bg-[#050406] text-white overflow-x-hidden">
        <Suspense fallback={null}>
          {isLoaded && !isMobile && <HomeEffects />}
        </Suspense>
        <ScrollProgress />
        <Navbar />

        <main className="flex-1 relative z-10">
          {/* Handles full 3D interactive zoom with intro.glb */}
          <HeroSection />
          
          {/* Below sections flow up naturally following pin completion */}
          <div className="relative bg-[#050406] z-20">
            <Highlights centerOnMobile />
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {/* Model 2 - Pinned Telemetry Character Hero Showcase Section */}
            <section
              id="character-showcase-section"
              className="relative h-screen w-full bg-[#050406] overflow-hidden"
            >
              {/* Full-bleed 3D Character Canvas */}
              <Suspense fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050406] z-10">
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                  <span className="text-xs tracking-widest text-muted-foreground uppercase animate-pulse font-mono">Initializing Telemetry Link...</span>
                </div>
              }>
                <CharacterHeroScene scrollProgressRef={characterScrollProgressRef} />
              </Suspense>

              {/* HUD Frame / Telemetry lines overlay */}
              <div className="absolute inset-6 md:inset-10 border border-white/[0.03] pointer-events-none z-20">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-secondary/60" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-secondary/60" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-secondary/60" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-secondary/60" />

                {/* Telemetry metadata */}
                <div className="absolute top-4 left-6 flex items-center gap-2 text-[9px] font-mono tracking-widest text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>TELEMETRY LINK - LIVE</span>
                </div>

                <div className="absolute top-4 right-6 text-[9px] font-mono tracking-widest text-white/50">
                  <span>REACTOR CORE: <span className="text-secondary font-bold">98.4%</span></span>
                </div>

                <div className="absolute bottom-4 left-6 text-[9px] font-mono tracking-widest text-white/40">
                  <span>N.E.X.U.S. // COMPILER // VER. 2.0.26</span>
                </div>

                <div className="absolute bottom-4 right-6 text-[9px] font-mono tracking-widest text-white/40 animate-pulse">
                  <span>SCROLL TO ANALYZE ↓</span>
                </div>
              </div>

              {/* Overlay Content A - Intro Info (Fades out on scroll) */}
              <div
                id="showcase-overlay-intro"
                className="absolute inset-0 flex items-center pointer-events-none z-20"
              >
                <div className="container mx-auto px-8 md:px-20 lg:px-28">
                  <div className="max-w-xl space-y-6 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] font-mono">
                        PROTOCOL: MK-2K26
                      </span>
                    </div>
                    <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                      I am <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">Nexus</span>
                      <span className="text-secondary text-glow-purple">.</span>
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base max-w-md font-light leading-relaxed">
                      The ultimate multi-domain technology fest. Engineered to push the limits of innovation, design, and code. Scroll to initiate full system telemetry.
                    </p>
                    
                    <div className="flex gap-4 pt-2">
                      <div className="flex flex-col text-left border-l-2 border-secondary pl-3">
                        <span className="text-[10px] font-mono uppercase text-white/40">SYSTEM RUNTIME</span>
                        <span className="text-sm font-bold text-white">ACTIVE</span>
                      </div>
                      <div className="flex flex-col text-left border-l-2 border-secondary pl-3">
                        <span className="text-[10px] font-mono uppercase text-white/40">REACTOR SPEED</span>
                        <span className="text-sm font-bold text-white">3.2 GHZ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay Content B - About Info (Fades in on scroll) */}
              <div
                id="showcase-overlay-about"
                className="absolute inset-0 flex items-center justify-center lg:justify-start pointer-events-none z-20 opacity-0"
              >
                <div className="container mx-auto px-8 md:px-20 lg:px-28">
                  <div className="max-w-2xl space-y-6 pointer-events-auto glass-card p-6 md:p-8 border border-white/5 bg-black/40 backdrop-blur-md rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5">
                      <span className="text-[10px] font-semibold text-neon-cyan uppercase tracking-[0.2em] font-mono">
                        Fest Diagnostics
                      </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
                      About the <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-primary">Fest & Initiative</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">
                      IGNITIA 2K26 brings together the brightest coders, designers, gamers, and roboticists. Sponsored by UEM Kolkata and IEM-UEM Group, it is a crucible of competitive spirit, creative expression, and technical mastery. Join us for 2 days of adrenaline, innovation, and celebration.
                    </p>
                    
                    {/* Core Stats / Grid inside about */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="border-t border-white/5 pt-4">
                        <h5 className="text-xs uppercase font-mono text-white/50 tracking-wider">PRIZE MATRIX</h5>
                        <p className="text-xl font-bold text-secondary">₹2,00,000+</p>
                      </div>
                      <div className="border-t border-white/5 pt-4">
                        <h5 className="text-xs uppercase font-mono text-white/50 tracking-wider">COLLABORATORS</h5>
                        <p className="text-xl font-bold text-neon-cyan">50+ Campus Links</p>
                      </div>
                      <div className="border-t border-white/5 pt-4">
                        <h5 className="text-xs uppercase font-mono text-white/50 tracking-wider">CHAMPIONS</h5>
                        <p className="text-xl font-bold text-primary">5000+ Footfall</p>
                      </div>
                      <div className="border-t border-white/5 pt-4">
                        <h5 className="text-xs uppercase font-mono text-white/50 tracking-wider">ENGAGEMENTS</h5>
                        <p className="text-xl font-bold text-white">7+ Arenas</p>
                      </div>
                    </div>

                    {/* CTA buttons */}
                    <div className="pt-4 flex flex-wrap gap-4">
                      <a href="#register" className="glow-button flex items-center gap-2 text-xs py-2.5 px-6">
                        <span>Access Portal</span>
                        <span className="text-[10px] font-mono opacity-80">&gt;&gt;</span>
                      </a>
                      <a href="/events" className="glow-button-secondary border-white/10 text-white hover:border-white/30 text-xs py-2.5 px-6">
                        <span>Fest Schedule</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <WhyAttend />
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <FAQSection />
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <ParallaxSection offset={isMobile ? 10 : 25}>
              <Sponsors centerOnMobile />
            </ParallaxSection>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <CTABanner />

            {/* Event Map Location Embed */}
            <section className="section-padding py-16">
              <div className="container mx-auto max-w-5xl px-4">
                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] h-72 transition-all duration-300 hover:border-primary/30">
                  <iframe
                    src={mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    loading="lazy"
                    title="UEM Kolkata Location"
                  />
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-primary"
                  >
                    Open Maps
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;