import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      const newTrailPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setCursorTrail((prev) => [...prev.slice(-8), newTrailPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Trail dots */}
      {cursorTrail.map((pos, index) => (
        <motion.div
          key={pos.id}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: pos.x,
            top: pos.y,
            width: 8 - index * 0.5,
            height: 8 - index * 0.5,
            backgroundColor: `hsl(var(--accent))`,
            opacity: (index + 1) / cursorTrail.length * 0.5,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${12 - index}px hsl(var(--accent) / 0.6)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      ))}
      
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-accent"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: 20,
          height: 20,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 20px hsl(var(--accent) / 0.8), inset 0 0 10px hsl(var(--accent) / 0.4)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};
