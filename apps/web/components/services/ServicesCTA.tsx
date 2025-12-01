'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SquareButton from '../SquareButton';

export default function ServicesCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      style={{
        backgroundColor: 'var(--tarabi3-primary)',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, transparent 50%, rgba(83, 52, 131, 0.1) 100%)',
          pointerEvents: 'none',
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative squares */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          border: '2px solid var(--tarabi3-accent)',
          opacity: 0.2,
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '80px',
          height: '80px',
          border: '2px solid var(--tarabi3-accent-alt)',
          opacity: 0.2,
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, -360],
              }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              <h2
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: '1.5rem',
                  color: 'var(--tarabi3-light)',
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
                  Transform
                </span>
                <br />
                Your Digital Presence?
              </h2>

              <p
                style={{
                  fontSize: '1.25rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  marginBottom: '2.5rem',
                  maxWidth: '500px',
                  margin: '0 auto 2.5rem',
                }}
              >
                Let&apos;s discuss your project and explore how we can help you achieve your goals.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <SquareButton size="large">Start a Project</SquareButton>
                
                <motion.a
                  href="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: 'var(--tarabi3-light)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
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
                  View Our Work
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </motion.a>
              </div>

              {/* Trust indicators */}
              <motion.div
                style={{
                  marginTop: '4rem',
                  paddingTop: '3rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
              >
                <p
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'rgba(245, 245, 245, 0.5)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Trusted by innovative brands
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'].map((brand, i) => (
                    <div
                      key={brand}
                      style={{
                        width: '100px',
                        height: '40px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255, 255, 255, 0.3)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
