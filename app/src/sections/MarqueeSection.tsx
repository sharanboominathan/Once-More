import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '../contexts/SmoothScrollContext';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT = 'WEDDING PHOTOGRAPHY \u2014 ENGAGEMENT SHOOTS \u2014 OUTDOOR SHOOTS \u2014 MODEL SHOOTS \u2014 MATERNITY & BABY SHOWER \u2014 BIRTHDAY CELEBRATIONS \u2014 ';

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();
  const baseDuration = 20;

  useEffect(() => {
    // Clip reveal entrance
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.0,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    // Velocity-based speed modulation
    let rafId: number;
    let currentScale = 1;

    const updateSpeed = () => {
      if (lenis) {
        const velocity = Math.abs(lenis.velocity);
        const targetScale = Math.min(velocity * 0.005 + 1, 3);
        currentScale += (targetScale - currentScale) * 0.1;

        if (trackRef.current) {
          const newDuration = baseDuration / currentScale;
          trackRef.current.style.animationDuration = `${newDuration}s`;
        }
      }
      rafId = requestAnimationFrame(updateSpeed);
    };

    rafId = requestAnimationFrame(updateSpeed);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
    };
  }, [lenis]);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-warm-cream py-2 overflow-hidden border-t border-b border-deep-burgundy/[0.08]"
    >
      <div
        ref={trackRef}
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${baseDuration}s` }}
      >
        <span className="font-body text-sm md:text-base font-semibold tracking-[0.15em] text-deep-burgundy whitespace-nowrap px-4">
          {MARQUEE_TEXT}
        </span>
        <span className="font-body text-sm md:text-base font-semibold tracking-[0.15em] text-deep-burgundy whitespace-nowrap px-4">
          {MARQUEE_TEXT}
        </span>
      </div>
    </div>
  );
}
