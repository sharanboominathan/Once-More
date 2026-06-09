import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioImages = [
  { src: 'assets/portfolio-1.jpg', alt: 'Haldi ceremony candid moment', title: 'Haldi Ceremony' },
  { src: 'assets/portfolio-2.jpg', alt: 'Beach couple portrait at sunset', title: 'Beach Romance' },
  { src: 'assets/portfolio-3.jpg', alt: 'Bridal jewelry detail shot', title: 'Bridal Details' },
  { src: 'assets/portfolio-4.jpg', alt: 'Grand South Indian wedding venue', title: 'Venue Decor' },
  { src: 'assets/portfolio-5.jpg', alt: 'Emotional kanyadaan ceremony', title: 'Kanyadaan' },
  { src: 'assets/portfolio-6.jpg', alt: 'Bridesmaids celebrating', title: 'Bridal Party' },
  { src: 'assets/portfolio-7.jpg', alt: 'Groom baraat on horse', title: 'Baraat' },
  { src: 'assets/portfolio-8.jpg', alt: 'Maternity outdoor shoot', title: 'Maternity' },
  { src: 'assets/portfolio-9.jpg', alt: 'Wedding rings on jasmine', title: 'Ring Ceremony' },
  { src: 'assets/portfolio-10.jpg', alt: 'Decorated wedding mandapam', title: 'The Mandapam' },
  { src: 'assets/about-featured-wedding.jpg', alt: 'South Indian wedding couple', title: 'Traditional Wedding' },
  { src: 'assets/services-featured.jpg', alt: 'Photography team at work', title: 'Behind the Scenes' },
];

export default function PortfolioPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: 'power3.out',
      });

      const items = gridRef.current?.querySelectorAll('.portfolio-item');
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-deep-burgundy min-h-[100dvh] pt-24 pb-20">
      <div className="container-padding max-content">
        {/* Header */}
        <div ref={headerRef} className="py-16 text-center">
          <Link
            to="/"
            className="text-caption text-warm-champagne hover:text-warm-cream transition-colors"
          >
            &larr; BACK TO HOME
          </Link>
          <h1 className="font-display text-display-l text-warm-cream mt-6">
            Portfolio
          </h1>
          <p className="text-body-l text-warm-white/60 mt-4 max-w-[600px] mx-auto">
            A curated collection of our finest wedding moments, each telling a
            unique love story.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="portfolio-item group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="aspect-[4/5]">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl text-warm-cream">
                    {image.title}
                  </h3>
                  <p className="text-caption text-warm-champagne mt-2">
                    WEDDING
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="inline-block border border-warm-champagne text-warm-champagne px-10 py-4 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
