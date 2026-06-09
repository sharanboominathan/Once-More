import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Wedding Film', href: '/#wedding-film' },
  { label: 'Live Streaming', href: '/#live-streaming' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact Us', href: '/#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/portfolio') return location.pathname === '/portfolio';
    return false;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-20 md:h-20 flex items-center transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(43,15,15,0.9)] backdrop-blur-[12px]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full container-padding flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="font-display text-[24px] font-normal text-warm-cream leading-none">
              ONCE MORE
            </span>
            <span className="font-body text-[10px] font-medium text-warm-cream tracking-[0.2em] uppercase">
              PHOTOGRAPHY
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-body text-nav uppercase transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-warm-champagne opacity-100'
                    : 'text-warm-cream opacity-70 hover:opacity-100 hover:text-warm-champagne'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/#contact"
            className="hidden lg:block border border-warm-champagne text-warm-champagne px-7 py-3 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
          >
            Enquire / Hire
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-warm-cream transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-warm-cream transition-all duration-300 ${
                mobileOpen ? '-rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-deep-burgundy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-display text-display-m text-warm-cream opacity-80 hover:opacity-100 hover:text-warm-champagne transition-all duration-300"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="mt-4 border border-warm-champagne text-warm-champagne px-8 py-4 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
          >
            Enquire / Hire
          </Link>
        </div>
      </div>
    </>
  );
}
