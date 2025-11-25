import { useEffect, useRef } from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export const Marquee = ({ items, speed = 50 }: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let position = 0;
    const animate = () => {
      position -= 1;
      if (Math.abs(position) >= marquee.scrollWidth / 2) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden bg-foreground text-background py-6 relative">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {duplicatedItems.map((item, index) => (
          <span key={index} className="text-4xl font-bold mx-8">
            {item}
          </span>
        ))}
      </div>
      {/* Fade overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-foreground to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-foreground to-transparent pointer-events-none" />
    </div>
  );
};
