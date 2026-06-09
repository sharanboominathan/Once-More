import { useEffect, useRef } from 'react';
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
    <div className="text-center">
      <span
        ref={numRef}
        className="font-display text-display-m text-warm-champagne"
      >
        0{suffix}
      </span>
      <p className="text-caption text-warm-white/50 mt-2">{label}</p>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Caption fade in
      gsap.from(captionRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Image mask reveal
      const maskTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      maskTl.to(maskRef.current, {
        scaleY: 0,
        duration: 1.5,
        ease: 'power3.inOut',
      });
      maskTl.to(
        imageRef.current,
        {
          scale: 1,
          duration: 1.5,
          ease: 'power3.inOut',
        },
        '<'
      );

      // Headline character reveal
      if (headlineRef.current) {
        const text = headlineRef.current.textContent || '';
        headlineRef.current.innerHTML = '';

        const words = text.split(' ');
        words.forEach((word) => {
          const wordWrapper = document.createElement('span');
          wordWrapper.style.display = 'inline-block';
          wordWrapper.style.overflow = 'hidden';
          wordWrapper.style.marginRight = '0.3em';

          word.split('').forEach((char) => {
            const charWrapper = document.createElement('span');
            charWrapper.style.display = 'inline-block';
            charWrapper.style.overflow = 'hidden';

            const inner = document.createElement('span');
            inner.textContent = char;
            inner.style.display = 'inline-block';
            inner.style.transform = 'translateY(120%)';

            charWrapper.appendChild(inner);
            wordWrapper.appendChild(charWrapper);
          });

          headlineRef.current!.appendChild(wordWrapper);
        });

        const allChars = headlineRef.current.querySelectorAll('span > span');

        gsap.to(allChars, {
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.03,
          delay: 0.1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Body fade up
      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-deep-burgundy section-padding"
    >
      <div className="container-padding max-content">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div>
            <span
              ref={captionRef}
              className="text-caption text-warm-champagne tracking-[0.15em] mb-6 block"
            >
              DRIVEN BY VISION
            </span>
            <div
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-xl aspect-[4/5]"
            >
              <img
                ref={imageRef}
                src="assets/about-featured-wedding.jpg"
                alt="South Indian wedding couple in traditional attire"
                className="w-full h-full object-cover scale-[1.2]"
              />
              <div
                ref={maskRef}
                className="absolute inset-0 bg-deep-burgundy origin-top"
              />
            </div>
          </div>

          {/* Text Column */}
          <div>
            <h2
              ref={headlineRef}
              className="text-display-l text-warm-cream"
            >
              Capturing love, one frame at a time
            </h2>

            <div ref={bodyRef} className="mt-8">
              <p className="text-body-l text-warm-white/75">
                Our passion is capturing fantasy moments on film for our clients,
                immortalizing special events and creating keepsakes to treasure
                forever.
              </p>
              <p className="text-body-l text-warm-white/75 mt-6">
                We pride ourselves on our traditional style that will make your
                photos timeless. Adding to that is a fusion of candid,
                photojournalistic, creative, fine art and documentary styles of
                photography. We spend time getting to know YOU so that each photo
                and portrait we capture reflects your style and personality.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <StatItem value={800} suffix="+" label="Weddings Captured" delay={0} />
              <StatItem value={10} suffix="+" label="Years of Experience" delay={0.2} />
              <StatItem value={5000} suffix="+" label="Happy Moments" delay={0.4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
