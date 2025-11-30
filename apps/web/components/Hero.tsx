'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AnimatedGrid from './AnimatedGrid';
import SquareButton from './SquareButton';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--tarabi3-primary)',
        overflow: 'hidden',
      }}
    >
      <AnimatedGrid />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="row justify-content-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="col-12 col-lg-10">
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '1rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--tarabi3-accent)',
                marginBottom: '1.5rem',
              }}
            >
              Digital Headquarters
            </motion.p>

            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              We Build.{' '}
              <span style={{ color: 'var(--tarabi3-accent)' }}>We Grow.</span>
              <br />
              We Square.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'rgba(245, 245, 245, 0.7)',
                maxWidth: '600px',
                margin: '0 auto 2.5rem',
              }}
            >
              Transform your digital presence with geometric precision. We craft
              robust solutions that multiply your success.
            </motion.p>

            <motion.div variants={itemVariants}>
              <SquareButton size="large">Get Started</SquareButton>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 10, 0],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(245, 245, 245, 0.3)',
            borderRadius: '12px',
            position: 'relative',
          }}
        >
          <motion.div
            style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'var(--tarabi3-accent)',
              borderRadius: '2px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 12, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
