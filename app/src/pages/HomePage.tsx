import HeroSection from '../sections/HeroSection';
import MarqueeSection from '../sections/MarqueeSection';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import PortfolioPreviewSection from '../sections/PortfolioPreviewSection';
import WeddingFilmSection from '../sections/WeddingFilmSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import LiveStreamingSection from '../sections/LiveStreamingSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioPreviewSection />
      <WeddingFilmSection />
      <TestimonialsSection />
      <LiveStreamingSection />
    </>
  );
}
