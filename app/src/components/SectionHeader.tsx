import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  caption: string;
  headline: string;
  captionColor?: string;
  headlineColor?: string;
  centered?: boolean;
}

export default function SectionHeader({
  caption,
  headline,
  captionColor = '#D4AF7A',
  headlineColor = '#FAF3E9',
  centered = true,
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Caption fade in
      gsap.from(captionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Headline character reveal
      const headlineEl = headlineRef.current;
      if (!headlineEl) return;

      const text = headlineEl.textContent || '';
      headlineEl.innerHTML = '';

      const wordSpans = text.split(' ').map((word) => {
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block';
        wordWrapper.style.overflow = 'hidden';
        wordWrapper.style.marginRight = '0.3em';

        const charSpans = word.split('').map((char) => {
          const charWrapper = document.createElement('span');
          charWrapper.style.display = 'inline-block';
          charWrapper.style.overflow = 'hidden';

          const inner = document.createElement('span');
          inner.textContent = char;
          inner.style.display = 'inline-block';
          inner.style.transform = 'translateY(120%)';

          charWrapper.appendChild(inner);
          return inner;
        });

        charSpans.forEach((c) => wordWrapper.appendChild(c.parentElement!));
        headlineEl.appendChild(wordWrapper);
        return charSpans;
      });

      const allChars = wordSpans.flat();

      gsap.to(allChars, {
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.03,
        delay: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [headline]);

  return (
    <div
      ref={containerRef}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      <span
        ref={captionRef}
        className="text-caption inline-block"
        style={{ color: captionColor }}
      >
        {caption}
      </span>
      <h2
        ref={headlineRef}
        className="text-display-l mt-4"
        style={{ color: headlineColor }}
      >
        {headline}
      </h2>
    </div>
  );
}
