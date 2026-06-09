import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: numRef.current,
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 2.0,
            delay,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: () => {
              if (numRef.current) {
                numRef.current.textContent = `${Math.round(obj.val)}${suffix}`;
              }
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, delay]);

  return (
    <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg">
      <span
        ref={numRef}
        className="font-display text-display-m text-warm-champagne block"
      >
        0{suffix}
      </span>
      <p className="text-caption text-warm-white/50 mt-2">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: 'power3.out',
      });

      // Story Section Animation
      const storyItems = storyRef.current?.querySelectorAll('.animate-story');
      if (storyItems && storyItems.length > 0) {
        gsap.from(storyItems, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Stats Section Animation
      const statItems = statsRef.current?.querySelectorAll('.animate-stat');
      if (statItems && statItems.length > 0) {
        gsap.from(statItems, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
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
            About Us
          </h1>
          <p className="text-body-l text-warm-white/60 mt-4 max-w-[600px] mx-auto">
            Get to know the passionate minds and artistic lenses capturing your timeless moments.
          </p>
        </div>

        {/* Story Section */}
        <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
          <div className="animate-story relative overflow-hidden rounded-xl aspect-[4/5]">
            <img
              src="assets/about-featured-wedding.jpg"
              alt="South Indian wedding couple in traditional attire"
              className="w-full h-full object-cover scale-[1.05]"
            />
          </div>

          <div className="space-y-6">
            <span className="animate-story text-caption text-warm-champagne tracking-[0.15em] block">
              DRIVEN BY VISION
            </span>
            <h2 className="animate-story font-display text-display-m text-warm-cream leading-tight">
              Capturing love, one frame at a time
            </h2>
            <p className="animate-story text-body-l text-warm-white/75">
              Our passion is capturing fantasy moments on film for our clients, immortalizing special events and creating keepsakes to treasure forever.
            </p>
            <p className="animate-story text-body-l text-warm-white/75">
              We pride ourselves on our traditional style that will make your photos timeless. Adding to that is a fusion of candid, photojournalistic, creative, fine art and documentary styles of photography. We spend time getting to know YOU so that each photo and portrait we capture reflects your style and personality.
            </p>
            <p className="animate-story text-body-l text-warm-white/75">
              From grand celebrations to intimate moments, our team focuses on preserving the emotional depth and raw beauty of every scene, ensuring your memories remain vivid for generations to come.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mt-24">
          <div className="text-center mb-12">
            <span className="text-caption text-warm-champagne tracking-[0.15em] block mb-4">OUR BENCHMARKS</span>
            <h3 className="font-display text-display-m text-warm-cream">Our Legacy in Numbers</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-stat">
              <StatItem value={800} suffix="+" label="Weddings Captured" delay={0} />
            </div>
            <div className="animate-stat">
              <StatItem value={10} suffix="+" label="Years of Experience" delay={0.2} />
            </div>
            <div className="animate-stat">
              <StatItem value={5000} suffix="+" label="Happy Moments" delay={0.4} />
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-20">
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
