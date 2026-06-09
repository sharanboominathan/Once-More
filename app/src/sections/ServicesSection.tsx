import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    name: 'Wedding Photography',
    description: 'Traditional, candid & cinematic coverage of your special day',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    name: 'Engagement Shoots',
    description: 'Pre-wedding sessions that tell your unique love story',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: 'Outdoor Shoots',
    description: 'Natural light portraits in stunning locations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    name: 'Model Shoots',
    description: 'Portfolio and fashion photography for aspiring talent',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    name: 'Maternity & Baby Shower',
    description: 'Celebrating the beautiful journey of motherhood',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    name: 'Birthday Celebrations',
    description: 'Capturing joy and memories for all ages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 122, 0.1), transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-lg border border-deep-burgundy/[0.08] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-out cursor-default overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
      />
      <div className="relative z-10">
        {service.icon}
        <h3 className="font-display text-[20px] text-deep-burgundy mt-6">
          {service.name}
        </h3>
        <p className="text-[14px] text-muted-taupe leading-relaxed mt-2 line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured image entrance
      gsap.from(imageRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger entrance
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Perspective flatten on scroll
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          rotateY: 0,
          rotateX: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-warm-cream section-padding"
    >
      <div className="container-padding max-content">
        <SectionHeader
          caption="WHAT WE DO"
          headline="Our Services"
          captionColor="#8B7B6B"
          headlineColor="#2B0F0F"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-16">
          {/* Featured Image */}
          <div ref={imageRef} className="overflow-hidden rounded-xl aspect-[3/4]">
            <img
              src="/assets/services-featured.jpg"
              alt="Wedding photography team at work"
              className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-600"
            />
          </div>

          {/* Service Cards Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            style={{
              perspective: '1000px',
              transform: 'rotateY(-4deg) rotateX(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {services.map((service) => (
              <div key={service.name} className="service-card">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
