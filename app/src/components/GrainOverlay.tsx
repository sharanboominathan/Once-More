import { useEffect, useRef } from 'react';

export default function GrainOverlay() {
  const grainRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastShiftRef = useRef(0);

  useEffect(() => {
    const grain = grainRef.current;
    if (!grain) return;

    const TILE_SIZE = 128;

    const animate = (time: number) => {
      if (time - lastShiftRef.current > 100) {
        const x = Math.floor(Math.random() * 5) * TILE_SIZE;
        const y = Math.floor(Math.random() * 5) * TILE_SIZE;
        grain.style.backgroundPosition = `-${x}px -${y}px`;
        lastShiftRef.current = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={grainRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.06] mix-blend-overlay will-change-transform"
      style={{
        backgroundImage: 'url(/assets/grain-texture.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  );
}
