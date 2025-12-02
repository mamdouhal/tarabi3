'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ValuesSection() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We stay ahead of trends, constantly exploring new technologies and creative approaches.',
      color: '#e94560',
    },
    {
      icon: '🎯',
      title: 'Precision',
      description: 'Every detail matters. We craft pixel-perfect solutions with meticulous attention.',
      color: '#533483',
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'Your success is our success. We build lasting relationships based on trust and transparency.',
      color: '#e94560',
    },
    {
      icon: '⚡',
      title: 'Impact',
      description: 'We focus on results that matter — measurable outcomes that drive your business forward.',
      color: '#533483',
    },
    {
      icon: '🔄',
      title: 'Adaptability',
      description: 'In a fast-changing digital landscape, we pivot and evolve to keep you ahead.',
      color: '#e94560',
    },
    {
      icon: '🌟',
      title: 'Excellence',
      description: 'We never settle for good enough. We strive for exceptional in everything we do.',
      color: '#533483',
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--tarabi3-secondary)',
        position: 'relative',
      }}
    >
      {/* Decorative squares */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 60 + i * 20,
              height: 60 + i * 20,
              border: '1px solid rgba(233, 69, 96, 0.1)',
              transform: 'rotate(45deg)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    rotate: [45, 135, 45],
                    opacity: [0.1, 0.2, 0.1],
                  }
            }
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--tarabi3-accent)',
              marginBottom: '1rem',
            }}
          >
            What Drives Us
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Our Core Values
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(245, 245, 245, 0.7)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            These principles guide every decision we make and every project we undertake.
          </p>
        </motion.div>

        <div className="row g-4">
          {values.map((value, index) => (
            <div key={value.title} className="col-12 col-md-6 col-lg-4">
              <motion.div
                style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        borderColor: value.color,
                      }
                }
              >
                {/* Top accent line */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${value.color}, transparent)`,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.6,
                    delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
                  }}
                />

                <span
                  style={{
                    fontSize: '2.5rem',
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                >
                  {value.icon}
                </span>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    color: 'var(--tarabi3-light)',
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'rgba(245, 245, 245, 0.6)',
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {value.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
