'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

export default function AnimatedGrid() {
  const shouldReduceMotion = useReducedMotion();

  const squares = useMemo(() => {
    const items = [];
    const cols = 20;
    const rows = 12;
    
    for (let i = 0; i < cols * rows; i++) {
      items.push({
        id: i,
        delay: (i % cols) * 0.05 + Math.floor(i / cols) * 0.05,
      });
    }
    return items;
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        gap: '1px',
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    >
      {squares.map((square) => (
        <motion.div
          key={square.id}
          style={{
            backgroundColor: 'var(--tarabi3-grid)',
            border: '1px solid rgba(255, 255, 255, 0.02)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 4,
                  delay: square.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </div>
  );
}
