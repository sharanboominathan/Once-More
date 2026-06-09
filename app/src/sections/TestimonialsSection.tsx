import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured testimonial entrance
      gsap.from(featuredRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Secondary testimonial entrance
      gsap.from(secondaryRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: secondaryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-deep-burgundy section-padding"
    >
      <div className="container-padding max-content-sm">
        <SectionHeader
          caption="TESTIMONIALS"
          headline="From Our Couples"
          captionColor="#D4AF7A"
          headlineColor="#FAF3E9"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Featured Testimonial */}
          <div
            ref={featuredRef}
            className="relative bg-white/[0.03] border border-warm-champagne/15 rounded-xl p-10 md:p-14"
          >
            {/* Decorative Quote Mark */}
            <span
              className="absolute top-6 left-8 font-display text-[120px] leading-none text-warm-champagne/20 select-none animate-quote-pulse"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="relative z-10">
              <p className="font-display text-xl md:text-2xl text-warm-cream leading-relaxed italic">
                First of all, thanks to the whole team for putting in so much
                effort in making my day special. The memories that were captured
                are truly incredible and I am sure I can cherish those anytime I
                wish. Thank you all for the beautiful memories. Almost we
                consulted 25-30 photographers out of which we chose you guys for
                some reason. But today there were so many people who appreciated
                us for choosing you guys. I wish your team gets a lot more of
                success and be as best as always.
              </p>
            </blockquote>

            <div className="mt-8">
              <p className="font-body text-base font-medium text-warm-champagne">
                Manoj &amp; Priyanka
              </p>
              <p className="text-caption text-warm-white/40 mt-2">
                Traditional South Indian Wedding
              </p>
            </div>
          </div>

          {/* Secondary Testimonial + Photo Collage */}
          <div ref={secondaryRef}>
            <blockquote>
              <p className="text-body-l text-warm-white/70 leading-relaxed italic">
                We moved out of India 20 plus years back and wished to have an
                Indian wedding for our son Vikram with Nandini at Ideal Beach
                Resort, Mahabalipuram &mdash; a Beach Wedding theme. Moments
                captured on the day by Once More Photography was truly stunning
                and spectacular quality. You are absolutely amazing!!! We
                recommend ONCEMORE PHOTOGRAPHY, 100% to anyone getting married.
              </p>
            </blockquote>

            <div className="mt-6">
              <p className="font-body text-base font-medium text-warm-champagne">
                Mani &amp; Angai
              </p>
              <p className="text-caption text-warm-white/40 mt-2">
                Dublin, Ireland
              </p>
            </div>

            {/* Photo Collage */}
            <div className="flex items-center gap-2 mt-8">
              <div className="flex -space-x-4">
                <img
                  src="/assets/testimonial-thumb-1.jpg"
                  alt="Happy bride"
                  className="w-16 h-16 rounded-full border-2 border-deep-burgundy object-cover"
                />
                <img
                  src="/assets/testimonial-thumb-2.jpg"
                  alt="Wedding couple"
                  className="w-16 h-16 rounded-full border-2 border-deep-burgundy object-cover"
                />
                <img
                  src="/assets/testimonial-thumb-3.jpg"
                  alt="Wedding ceremony"
                  className="w-16 h-16 rounded-full border-2 border-deep-burgundy object-cover"
                />
              </div>
              <span className="text-caption text-warm-white/40 ml-2">
                +798 more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
