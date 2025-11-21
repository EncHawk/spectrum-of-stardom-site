import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IDLE_TIMEOUT = 800;
const getInitialPosition = () =>
  typeof window !== 'undefined'
    ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    : { x: 0, y: 0 };

export const CosmicCursor = () => {
  const [mousePosition, setMousePosition] = useState(getInitialPosition);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<number>();

  const scheduleIdle = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsActive(false), IDLE_TIMEOUT);
  };

  const updatePosition = (x: number, y: number) => {
    setMousePosition({ x, y });
    setTrail((prevTrail) => [...prevTrail.slice(-8), { x, y, id: Date.now() }]);
    setIsActive(true);
    scheduleIdle();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleScroll = () => {
      if (!isActive) return;
      scheduleIdle();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
              left: mousePosition.x - 12,
              top: mousePosition.y - 12,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            exit={{ opacity: 0, scale: 0.8 }}
          />

          {trail.map((point, index) => (
            <motion.div
              key={point.id}
              className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] mix-blend-screen"
              style={{
                background: index % 2 === 0 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
                left: point.x - 4,
                top: point.y - 4,
              }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}

          <motion.div
            className="fixed w-10 h-10 rounded-full border-2 border-primary/50 pointer-events-none z-[9997]"
            style={{
              left: mousePosition.x - 20,
              top: mousePosition.y - 20,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
