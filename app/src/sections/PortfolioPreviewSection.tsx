import { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const portfolioImages = [
  { src: 'assets/portfolio-1.jpg', alt: 'Haldi ceremony candid moment', ratio: '3/4' },
  { src: 'assets/portfolio-2.jpg', alt: 'Beach couple portrait at sunset', ratio: '1/1' },
  { src: 'assets/portfolio-3.jpg', alt: 'Bridal jewelry detail shot', ratio: '2/3' },
  { src: 'assets/portfolio-4.jpg', alt: 'Grand South Indian wedding venue', ratio: '1/1' },
  { src: 'assets/portfolio-5.jpg', alt: 'Emotional kanyadaan ceremony', ratio: '3/4' },
  { src: 'assets/portfolio-6.jpg', alt: 'Bridesmaids celebrating', ratio: '1/1' },
  { src: 'assets/portfolio-7.jpg', alt: 'Groom baraat on horse', ratio: '2/3' },
  { src: 'assets/portfolio-8.jpg', alt: 'Maternity outdoor shoot', ratio: '1/1' },
  { src: 'assets/portfolio-9.jpg', alt: 'Wedding rings on jasmine', ratio: '3/4' },
  { src: 'assets/portfolio-10.jpg', alt: 'Decorated wedding mandapam', ratio: '1/1' },
];

// Distribute images into columns
function distributeToColumns(images: typeof portfolioImages, numCols: number) {
  const columns: typeof portfolioImages[] = Array.from({ length: numCols }, () => []);
  images.forEach((img, i) => {
    columns[i % numCols].push(img);
  });
  return columns;
}

// Generate stable random params for parallax
function generateParallaxParams(count: number) {
  const params = [];
  for (let i = 0; i < count; i++) {
    params.push({
      y: 100 + Math.random() * 400,
      scale: 0.5 + Math.random() * 1.5,
    });
  }
  return params;
}

export default function PortfolioPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const columns = useMemo(() => distributeToColumns(portfolioImages, 5), []);
  const parallaxParams = useMemo(() => generateParallaxParams(portfolioImages.length), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;

      const colElements = gridRef.current.querySelectorAll('.parallax-column');

      colElements.forEach((col, colIndex) => {
        const direction = colIndex % 2 === 0 ? 1 : -1;
        const items = col.querySelectorAll('.parallax-item');

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top bottom+=5%',
            end: 'bottom top-=5%',
            scrub: true,
          },
        });

        // Column parallax
        tl.fromTo(
          col,
          { yPercent: direction * -30 },
          { yPercent: direction * 30 },
          0
        );

        // Individual item parallax
        items.forEach((item, itemIndex) => {
          const globalIndex = colIndex * 2 + itemIndex; // approximate
          const param = parallaxParams[globalIndex] || { y: 200, scale: 1 };

          tl.fromTo(
            item,
            {
              yPercent: direction * -1 * (param.y / 5),
              scale: param.scale < 1 ? param.scale : 1,
            },
            {
              yPercent: direction * (param.y / 5),
              scale: 1,
            },
            0
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [parallaxParams]);

  return (
    <section
      ref={sectionRef}
      className="bg-deep-burgundy pt-24 md:pt-32"
    >
      <div className="container-padding max-content">
        <SectionHeader
          caption="OUR WORK"
          headline="Moments We Cherish"
          captionColor="#D4AF7A"
          headlineColor="#FAF3E9"
        />
      </div>

      {/* Parallax Grid */}
      <div
        ref={gridRef}
        className="flex gap-3 md:gap-4 px-5 md:px-10 mt-12"
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="parallax-column flex-1 flex flex-col gap-3 md:gap-4"
          >
            {column.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="parallax-item overflow-hidden rounded-xl cursor-pointer"
                style={{ aspectRatio: image.ratio }}
                onClick={() => navigate('/portfolio')}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-600"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* View All CTA */}
      <div className="flex justify-center mt-16 pb-20">
        <button
          onClick={() => navigate('/portfolio')}
          className="border border-warm-champagne text-warm-champagne px-10 py-4 text-cta uppercase font-body transition-all duration-300 hover:bg-warm-champagne hover:text-deep-burgundy"
        >
          View Full Portfolio &rarr;
        </button>
      </div>
    </section>
  );
}
