import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Video fade in at 200ms
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0.2
      );

      // 2. Grain fade in at 600ms
      tl.fromTo(
        grainRef.current,
        { opacity: 0 },
        { opacity: 0.08, duration: 0.8 },
        0.6
      );

      // 3. Headline character reveal with blur - Line 1 at 800ms
      const revealLine = (
        ref: React.RefObject<HTMLSpanElement | null>,
        delay: number
      ) => {
        if (!ref.current) return;
        const text = ref.current.textContent || '';
        ref.current.innerHTML = '';

        const chars = text.split('').map((char) => {
          const wrapper = document.createElement('span');
          wrapper.style.display = 'inline-block';
          wrapper.style.overflow = 'hidden';

          const inner = document.createElement('span');
          inner.textContent = char === ' ' ? '\u00A0' : char;
          inner.style.display = 'inline-block';
          inner.style.filter = 'blur(8px)';
          inner.style.transform = 'translateY(120%)';

          wrapper.appendChild(inner);
          ref.current!.appendChild(wrapper);
          return inner;
        });

        tl.to(
          chars,
          {
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.04,
          },
          delay
        );
      };

      revealLine(line1Ref, 0.8);
      revealLine(line2Ref, 1.0);
      revealLine(line3Ref, 1.2);

      // 4. Subtext fade up at 2000ms
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        2.0
      );

      // 5. CTA fade up
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        2.3
      );

      // 6. Scroll indicator at 2600ms
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        2.6
      );
    }, sectionRef);

    // Lazy load video after paint
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-deep-burgundy"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[1] opacity-0"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero-poster.jpg"
        preload="none"
      >
        <source src="/assets/hero-wedding-cinematography.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(180deg, rgba(43, 15, 15, 0.3) 0%, rgba(10, 10, 10, 0.6) 100%)',
        }}
      />

      {/* Grain Overlay for Hero */}
      <div
        ref={grainRef}
        className="absolute inset-0 z-[3] pointer-events-none opacity-0 mix-blend-overlay"
        style={{
          backgroundImage: 'url(/assets/grain-texture.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1 className="text-display-xl text-warm-cream text-center">
          <span
            ref={line1Ref}
            className="block"
            style={{ textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)' }}
          >
            An
          </span>
          <span
            ref={line2Ref}
            className="block"
            style={{ textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)' }}
          >
            Art
          </span>
          <span
            ref={line3Ref}
            className="block"
            style={{ textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)' }}
          >
            of Observation
          </span>
        </h1>

        <p
          ref={subtextRef}
          className="text-body-l text-warm-cream/80 text-center max-w-[480px] mt-8 opacity-0"
          style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)' }}
        >
          We are one of the best wedding and event photographers in Chennai.
        </p>

        <div ref={ctaRef} className="mt-8 opacity-0">
          <a
            href="#about"
            className="border border-warm-champagne text-warm-champagne px-8 py-4 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
          >
            Explore Our Story
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0 hidden md:flex"
      >
        <span className="text-caption text-warm-cream/50">SCROLL</span>
        <div className="relative w-[1px] h-10 bg-warm-cream/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-warm-champagne animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
