import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const WarpTransition = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '0px',
          }}
          initial={{ width: '0px', opacity: 0 }}
          animate={{
            width: '100vw',
            opacity: [0, 1, 0],
            x: [0, -window.innerWidth],
          }}
          transition={{
            duration: 0.45,
            delay: i * 0.015,
            ease: 'easeIn',
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent"
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </motion.div>
  );
};
