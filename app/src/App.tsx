import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SmoothScrollProvider, useSmoothScroll } from './contexts/SmoothScrollContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';

function ScrollToHash() {
  const location = useLocation();
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!location.hash) return;

    // Remove the '#' prefix from hash
    const id = location.hash.substring(1);
    
    // Wait a tiny bit for the DOM to render/paint
    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element);
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.hash, lenis]);

  return null;
}

function App() {
  return (
    <SmoothScrollProvider>
      <ScrollToHash />
      <div className="relative min-h-[100dvh]">
        <Navigation />
        <GrainOverlay />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
