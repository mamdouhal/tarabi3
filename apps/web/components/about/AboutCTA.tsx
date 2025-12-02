'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutCTA() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--tarabi3-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(83, 52, 131, 0.1) 0%, transparent 50%)
          `,
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                background: [
                  `radial-gradient(ellipse at 30% 50%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
                   radial-gradient(ellipse at 70% 50%, rgba(83, 52, 131, 0.1) 0%, transparent 50%)`,
                  `radial-gradient(ellipse at 40% 40%, rgba(233, 69, 96, 0.15) 0%, transparent 50%),
                   radial-gradient(ellipse at 60% 60%, rgba(83, 52, 131, 0.15) 0%, transparent 50%)`,
                  `radial-gradient(ellipse at 30% 50%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
                   radial-gradient(ellipse at 70% 50%, rgba(83, 52, 131, 0.1) 0%, transparent 50%)`,
                ],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating squares */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 80 + i * 30,
              height: 80 + i * 30,
              border: '1px solid rgba(233, 69, 96, 0.2)',
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    rotate: [0, 90],
                    opacity: [0.2, 0.4, 0.2],
                    y: [0, -20, 0],
                  }
            }
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              <motion.div
                style={{
                  display: 'inline-block',
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                }}
                animate={shouldReduceMotion ? {} : { rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🚀
              </motion.div>

              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                Ready to{' '}
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
                Your Success?
              </h2>

              <p
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '550px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Let's discuss how we can help transform your digital presence 
                and drive meaningful results for your business.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
                className="flex-sm-row justify-content-center"
              >
                <motion.a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2.5rem',
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.05,
                          boxShadow: '0 10px 40px rgba(233, 69, 96, 0.3)',
                        }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  Start a Project
                  <span>→</span>
                </motion.a>

                <motion.a
                  href="/services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2.5rem',
                    background: 'transparent',
                    color: 'var(--tarabi3-light)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          borderColor: 'var(--tarabi3-accent)',
                          color: 'var(--tarabi3-accent)',
                        }
                  }
                >
                  View Services
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact info cards */}
        <motion.div
          className="row g-4 mt-5 justify-content-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
        >
          {[
            { icon: '📧', label: 'Email', value: 'hello@tarabi3.com' },
            { icon: '📍', label: 'Location', value: 'Dubai, UAE' },
            { icon: '🕐', label: 'Response', value: 'Within 24hrs' },
          ].map((item, index) => (
            <div key={item.label} className="col-12 col-md-4 col-lg-3">
              <motion.div
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(233, 69, 96, 0.3)',
                      }
                }
              >
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>
                  {item.icon}
                </span>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(245, 245, 245, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--tarabi3-light)',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {item.value}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
