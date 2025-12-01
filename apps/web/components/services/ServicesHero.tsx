'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MathBackground from '../MathBackground';

export default function ServicesHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--tarabi3-primary)',
        overflow: 'hidden',
        paddingTop: '100px',
      }}
    >
      <MathBackground />
      
      {/* Floating geometric shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 100 + i * 30,
              height: 100 + i * 30,
              border: '1px solid var(--tarabi3-accent)',
              opacity: 0.1,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1],
                  }
            }
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--tarabi3-accent)',
                  marginBottom: '1rem',
                }}
              >
                What We Offer
              </p>
              
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                Services Built for{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Growth
                </span>
              </h1>
              
              <p
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                We combine strategic thinking with technical excellence to deliver 
                solutions that drive real results for your business.
              </p>
            </motion.div>

            {/* Animated line */}
            <motion.div
              style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                margin: '3rem auto 0',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
