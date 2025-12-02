'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WorkCTA() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--tarabi3-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated mesh gradient */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            conic-gradient(from 180deg at 50% 50%, 
              rgba(233, 69, 96, 0.1) 0deg, 
              rgba(83, 52, 131, 0.1) 120deg, 
              rgba(0, 217, 255, 0.1) 240deg, 
              rgba(233, 69, 96, 0.1) 360deg)
          `,
          filter: 'blur(100px)',
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating tech icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {['⚙️', '🌐', '🤖', '📊', '💡', '🚀'].map((icon, i) => (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              fontSize: '2rem',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.2,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -30, 0],
                    rotate: [0, 10, -10, 0],
                  }
            }
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {icon}
          </motion.span>
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
              {/* Animated badge */}
              <motion.div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(233, 69, 96, 0.1)',
                  border: '1px solid rgba(233, 69, 96, 0.3)',
                  marginBottom: '2rem',
                }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        boxShadow: [
                          '0 0 0 0 rgba(233, 69, 96, 0)',
                          '0 0 0 10px rgba(233, 69, 96, 0)',
                        ],
                      }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--tarabi3-accent)',
                  }}
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--tarabi3-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Ready for Your Project
                </span>
              </motion.div>

              <h2
                style={{
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                Let's Build Something{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt), #00d9ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Amazing
                </span>{' '}
                Together
              </h2>

              <p
                style={{
                  fontSize: '1.2rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  maxWidth: '550px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Have a project in mind? We're excited to hear about it.
                Let's create the next success story together.
              </p>

              {/* CTA buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <motion.a
                  href="/#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem 2.5rem',
                    background: 'linear-gradient(135deg, var(--tarabi3-accent), var(--tarabi3-accent-alt))',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.05,
                          boxShadow: '0 20px 40px rgba(233, 69, 96, 0.3)',
                        }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span>Start a Project</span>
                  <motion.span
                    animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>

                <motion.a
                  href="/services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem 2.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'var(--tarabi3-light)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          borderColor: 'var(--tarabi3-accent)',
                          backgroundColor: 'rgba(233, 69, 96, 0.05)',
                        }
                  }
                >
                  View Services
                </motion.a>
              </div>

              {/* Trust indicators */}
              <motion.div
                style={{
                  marginTop: '4rem',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '3rem',
                  flexWrap: 'wrap',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.4 }}
              >
                {[
                  { icon: '⚡', text: 'Fast Delivery' },
                  { icon: '🛡️', text: 'Quality Assured' },
                  { icon: '💬', text: '24/7 Support' },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'rgba(245, 245, 245, 0.6)',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.9rem' }}>{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
