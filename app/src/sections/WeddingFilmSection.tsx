import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WeddingFilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ken Burns effect on background
      gsap.fromTo(
        bgRef.current,
        { scale: 1.0 },
        {
          scale: 1.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Content entrance
      const elements = contentRef.current?.querySelectorAll('.film-animate');
      if (elements) {
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="wedding-film"
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <img
          ref={bgRef}
          src="assets/wedding-film-bg.jpg"
          alt="Cinematic wedding ceremony at dusk"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(10,10,10,0.65)] z-[2]" />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 text-center px-6 py-20"
        >
          {/* Play Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="film-animate w-20 h-20 rounded-full border-2 border-warm-champagne flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 hover:bg-[rgba(212,175,122,0.1)] hover:shadow-[0_0_40px_rgba(212,175,122,0.2)] group"
            aria-label="Play wedding film"
          >
            <svg
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              className="ml-1"
            >
              <path
                d="M24 14L0 28V0L24 14Z"
                fill="#D4AF7A"
              />
            </svg>
          </button>

          <h2 className="film-animate font-display text-display-l text-warm-cream mt-8">
            Wedding Films
          </h2>

          <p className="film-animate text-body-l text-warm-white/75 max-w-[560px] mx-auto mt-6">
            We don&apos;t just capture moments &mdash; we craft cinematic stories
            that you&apos;ll treasure for a lifetime. Our wedding films blend
            documentary authenticity with cinematic artistry.
          </p>

          <button
            onClick={() => setLightboxOpen(true)}
            className="film-animate mt-8 border border-warm-champagne text-warm-champagne px-10 py-4 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
          >
            Explore Wedding Films
          </button>
        </div>
      </section>

      {/* Video Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-warm-cream text-2xl z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-pure-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="assets/hero-wedding-cinematography.mp4"
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
