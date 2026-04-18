import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Highlights from "@/components/Highlights";
import FeaturedEvents from "@/components/FeaturedEvents";
import WhyAttend from "@/components/WhyAttend";
import Sponsors from "@/components/Sponsors";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import MouseSpotlight from "@/components/MouseSpotlight";
import ParticleField from "@/components/ParticleField";
import ScrollProgress from "@/components/ScrollProgress";
import ShootingStars from "@/components/ShootingStars";
import CursorTrail from "@/components/CursorTrail";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ParallaxSection from "@/components/ParallaxSection";
import PageTransition from "@/components/PageTransition";
import RAOneArtifacts3D from "@/components/RAOneArtifacts3D";
import FloatingTechElements from "@/components/FloatingTechElements";
import AnnouncementBar from "@/components/AnnouncementBar";

const Index = () => (
  <>
    <MouseSpotlight />
    <CursorTrail />
    <PageTransition>
      <div className="min-h-screen bg-background scanline-overlay" style={{ paddingBottom: 52 }}>
        {/* Fixed layers */}
        <RAOneArtifacts3D />
        <FloatingTechElements />
        <ParticleField />
        <ShootingStars />
        <AnimatedBlobs />
        <ScrollProgress />

        {/* Page content */}
        <Navbar />
        <HeroSection />
        <Highlights />
        <ParallaxSection offset={30}>
          <FeaturedEvents />
        </ParallaxSection>
        <WhyAttend />
        <ParallaxSection offset={25}>
          <Sponsors />
        </ParallaxSection>
        <FAQSection />
        <CTABanner />
        <Footer />
      </div>
    </PageTransition>

    {/* Sticky bottom announcement bar — outside PageTransition so it's always on top */}
    <AnnouncementBar />
  </>
);

export default Index;
