import { Routes, Route } from 'react-router-dom';
import { SmoothScrollProvider } from './contexts/SmoothScrollContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-[100dvh]">
        <Navigation />
        <GrainOverlay />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
