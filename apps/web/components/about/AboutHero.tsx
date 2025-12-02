'use client';

import { motion, useReducedMotion } from 'framer-motion';
import MathBackground from '../MathBackground';

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--tarabi3-primary)',
        overflow: 'hidden',
        paddingTop: '100px',
      }}
    >
      <MathBackground />

      {/* Animated circles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 300 + i * 150,
              height: 300 + i * 150,
              borderRadius: '50%',
              border: '1px solid',
              borderColor: i === 0 ? 'var(--tarabi3-accent)' : 'var(--tarabi3-accent-alt)',
              opacity: 0.1 - i * 0.02,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.05, 1],
                    rotate: [0, i % 2 === 0 ? 360 : -360],
                  }
            }
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Glowing orb */}
      <motion.div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--tarabi3-accent) 0%, transparent 70%)',
          opacity: 0.1,
          filter: 'blur(80px)',
          top: '30%',
          right: '10%',
        }}
        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              {/* Decorative element */}
              <motion.div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
              >
                <span
                  style={{
                    width: '40px',
                    height: '1px',
                    background: 'var(--tarabi3-accent)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.875rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--tarabi3-accent)',
                  }}
                >
                  About Tarabi3
                </span>
                <span
                  style={{
                    width: '40px',
                    height: '1px',
                    background: 'var(--tarabi3-accent)',
                  }}
                />
              </motion.div>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                We{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Multiply
                </span>
                <br />
                Your Success
              </h1>

              <motion.p
                style={{
                  fontSize: '1.25rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '650px',
                  margin: '0 auto 2rem',
                  lineHeight: 1.7,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
              >
                Tarabi3 means "Squares" in Arabic — representing our approach to 
                building strong foundations and multiplying results through strategic 
                digital solutions.
              </motion.p>

              {/* Arabic calligraphy accent */}
              <motion.div
                style={{
                  fontSize: '3rem',
                  fontFamily: 'serif',
                  opacity: 0.3,
                  marginTop: '1rem',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.3, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.5 }}
              >
                تربيع
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span style={{ fontSize: '0.75rem', color: 'rgba(245, 245, 245, 0.5)' }}>
            Scroll to explore
          </span>
          <motion.div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--tarabi3-accent), transparent)',
            }}
            animate={shouldReduceMotion ? {} : { scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
