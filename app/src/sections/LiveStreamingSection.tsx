import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LiveStreamingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.stream-animate');
      if (elements) {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="live-streaming"
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1212 0%, #2B0F0F 50%, #1a0f0f 100%)',
      }}
    >
      <div className="container-padding max-content-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Text Content */}
          <div ref={contentRef}>
            {/* Live Badge */}
            <div className="stream-animate inline-flex items-center gap-2 bg-warm-champagne/15 border border-warm-champagne/30 text-warm-champagne px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.1em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-warm-champagne animate-pulse-dot" />
              LIVE
            </div>

            <h2 className="stream-animate font-display text-display-m text-warm-cream mt-5">
              Live Stream Your Special Day
            </h2>

            <p className="stream-animate text-body-l text-warm-white/65 mt-4 max-w-[500px]">
              Share your wedding with loved ones across the world in real-time.
              Our professional multi-camera live streaming brings every moment
              to those who can&apos;t be there in person.
            </p>

            <a
              href="#"
              className="stream-animate inline-block mt-6 border border-warm-champagne text-warm-champagne px-8 py-3.5 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
            >
              Learn About Live Streaming
            </a>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[280px] h-[180px] border-2 border-warm-champagne/30 rounded-xl bg-black/30 flex items-center justify-center animate-glow-pulse">
              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-[10px] font-semibold text-white uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
                LIVE
              </div>

              {/* Camera Icon */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4AF7A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>

              {/* Streaming indicator rings */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1">
                <span className="w-1 h-3 bg-warm-champagne/60 rounded-full" />
                <span className="w-1 h-5 bg-warm-champagne/80 rounded-full" />
                <span className="w-1 h-4 bg-warm-champagne/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
