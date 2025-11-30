'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface SquareButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  size?: 'default' | 'large';
}

export default function SquareButton({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
}: SquareButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = {
    position: 'relative' as const,
    display: 'inline-block',
    padding: size === 'large' ? '1rem 2.5rem' : '0.75rem 1.75rem',
    fontSize: size === 'large' ? '1.125rem' : '1rem',
    fontWeight: 600,
    border: variant === 'outline' ? '2px solid var(--tarabi3-accent)' : 'none',
    borderRadius: 0,
    backgroundColor: variant === 'primary' ? 'var(--tarabi3-accent)' : 'transparent',
    color: 'var(--tarabi3-light)',
    cursor: 'pointer',
    overflow: 'hidden',
    zIndex: 1,
  };

  return (
    <motion.button
      style={baseStyles}
      onClick={onClick}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '0%',
          backgroundColor:
            variant === 'primary'
              ? 'var(--tarabi3-accent-alt)'
              : 'var(--tarabi3-accent)',
          zIndex: -1,
        }}
        initial={{ height: '0%' }}
        whileHover={shouldReduceMotion ? {} : { height: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}
